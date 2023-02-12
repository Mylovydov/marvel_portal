import { ICharacter, IComic } from '../../interfaces/character.interface'
import { IUseMarvelService } from './marvelServiceForQuery.interface'
import useHttpForQuery from '../../hooks/useHttpForQuery/useHttpForQuery'
import { transformCharacter, transformComic } from './helpers'

const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
const _apiKey = 'apikey=d423d5fe13c364f3025f9ffe33f5eef1'
const _baseOffset = 250
const _baseComicsOffset = 0

const useMarvelServiceForQuery = (): IUseMarvelService => {
	const request = useHttpForQuery()

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
		getCharacter,
		getAllCharacters,
		findCharacter,
		getAllComics,
		getComic
	}
}

export default useMarvelServiceForQuery
