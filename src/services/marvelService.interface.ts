import { ICharacter, IComic } from '../interfaces/character.interface'

export interface IUseMarvelService {
	isLoading: boolean
	error: string | null

	getCharacter(id: number): Promise<ICharacter>

	getAllCharacters(offset?: number): Promise<ICharacter[]>

	getAllComics(offset?: number): Promise<IComic[]>

	getComic(id: string): Promise<IComic>

	clearError(): void
}
