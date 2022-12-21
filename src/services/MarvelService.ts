import { ICharacter, IComic } from '../interfaces/character.interface'
import useHttp from '../hooks/useHttp'

const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
const _apiKey = 'apikey=d423d5fe13c364f3025f9ffe33f5eef1'
const _baseOffset = 210
const _baseComicsOffset = 200

interface IUseMarvelService {
	isLoading: boolean
	error: string | null

	getCharacter(id: number): Promise<ICharacter>

	getAllCharacters(offset?: number): Promise<ICharacter[]>

	getAllComics(offset?: number): Promise<IComic[]>

	clearError(): void
}

const useMarvelService = (): IUseMarvelService => {
	const { isLoading, request, error, clearError } = useHttp()

	const transformCharComics = (comics: { resourceURI: string; name: string }[]) => {
		if (!comics.length) {
			return []
		}
		const comicsItems = []
		for (let i = 0; i <= 10; i++) {
			if (!comics[i]?.name) {
				break
			}
			comicsItems.push({
				comicsName: comics[i].name
			})
		}
		return comicsItems
	}

	const transformCharacter = (char: any): ICharacter => ({
		id: char.id,
		name: char.name,
		description: char.description
			? `${char.description.slice(0, 210)}...`
			: 'This character does not have a description',
		thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
		homepage: char.urls[0].url,
		wiki: char.urls[1].url,
		comics: transformCharComics(char.comics.items)
	})

	const transformComic = (comic: any): IComic => ({
		id: comic.id,
		image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
		uri: comic.resourceURI,
		title: comic.title.toLocaleUpperCase(),
		price: comic?.prices?.[0]?.price ? comic.prices[0].price + '$' : 'NOT AVAILABLE'
	})

	const getAllCharacters = async (offset: number = _baseOffset): Promise<ICharacter[]> => {
		const characters = await request({
			url: `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		})

		return characters.data.results.map(transformCharacter)
	}

	const getCharacter = async (id: number): Promise<ICharacter> => {
		const character = await request({ url: `${_apiBase}characters/${id}?${_apiKey}` })
		return transformCharacter(character.data.results[0])
	}

	const getAllComics = async (offset = _baseComicsOffset): Promise<IComic[]> => {
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
		getAllComics
	}
}

export default useMarvelService
