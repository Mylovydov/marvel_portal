import { ICharacter, IComic } from '../../interfaces/character.interface'

export interface IUseMarvelService {
	isLoading: boolean
	error: string | null

	getCharacter(id: number | string): Promise<ICharacter>

	getAllCharacters(offset?: number): Promise<ICharacter[]>

	findCharacter(name: string): Promise<ICharacter | null>

	getAllComics(offset?: number): Promise<IComic[]>

	getComic(id: string): Promise<IComic>

	clearError(): void
}
