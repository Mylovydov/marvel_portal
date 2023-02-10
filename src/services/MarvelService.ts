import {
	ICharacter,
	ICharComics,
	IComic,
	IComicsData
} from '../interfaces/character.interface'
import useHttp from '../hooks/useHttp/useHttp'
import { IUseMarvelService } from './marvelService.interface'

const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
const _apiKey = 'apikey=d423d5fe13c364f3025f9ffe33f5eef1'
const _baseOffset = 250
const _baseComicsOffset = 0

const useMarvelService = (): IUseMarvelService => {
	const { isLoading, request, error, clearError } = useHttp()

	const transformCharComics = (comics: IComicsData[]): ICharComics[] => {
		if (!comics.length) {
			return []
		}
		const comicsItems = []
		for (let i = 0; i <= 10; i++) {
			if (!comics[i]?.name || !comics[i]?.resourceURI) {
				break
			}
			const regExp = /\d{5}$/
			const comicId = comics[i].resourceURI.match(regExp)?.[0] || null
			comicsItems.push({
				comicsName: comics[i].name,
				id: comicId
			})
		}
		return comicsItems
	}

	const transformCharacter = (char: any): ICharacter => ({
		id: char.id,
		name: char.name,
		description: char.description
			? char.description
			: 'This character does not have a description',
		thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
		homepage: char.urls[0].url,
		wiki: char.urls[1].url,
		comics: transformCharComics(char.comics.items)
	})

	const transformComic = (comic: any): IComic => ({
		id: comic.id,
		image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
		title: comic.title.toLocaleUpperCase(),
		price: comic?.prices?.[0]?.price
			? comic.prices[0].price + '$'
			: 'Not available',
		description: comic.description || `No description for this comic`,
		pageCount: comic.pageCount
			? `${comic.pageCount} p.`
			: 'No information about the number of pages',
		language: comic.textObjects.language || `en-us`
	})

	const getAllCharacters = async (
		offset: number = _baseOffset
	): Promise<ICharacter[]> => {
		const characters = await request({
			url: `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		})

		return characters.data.results.map(transformCharacter)
	}

	const getCharacter = async (id: number | string): Promise<ICharacter> => {
		const character = await request({
			url: `${_apiBase}characters/${id}?${_apiKey}`
		})
		return transformCharacter(character.data.results[0])
	}

	const findCharacter = async (name: string): Promise<ICharacter | null> => {
		const { data } = await request({
			url: `${_apiBase}characters?name=${name}&${_apiKey}`
		})
		if (data.results.length) {
			return transformCharacter(data.results[0])
		}
		return null
	}

	const getComic = async (id: string): Promise<IComic> => {
		const character = await request({
			url: `${_apiBase}comics/${id}?${_apiKey}`
		})
		return transformComic(character.data.results[0])
	}

	const getAllComics = async (
		offset = _baseComicsOffset
	): Promise<IComic[]> => {
		const comics = await request({
			url: `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
		})
		return comics.data.results.map(transformComic)
	}

	return {
		isLoading,
		error,
		clearError,
		getCharacter,
		getAllCharacters,
		findCharacter,
		getAllComics,
		getComic
	}
}

export default useMarvelService
