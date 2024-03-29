import { ICharacter, IComic } from '../interfaces/character.interface'
import { IUseHttpReturn } from '../hooks/useHttp/useHttp.interface'

export interface IUseMarvelService extends Omit<IUseHttpReturn, 'request'> {
	getCharacter: (id: number | string) => Promise<ICharacter>
	getAllCharacters: (offset?: number) => Promise<ICharacter[]>
	findCharacter: (name: string) => Promise<ICharacter | null>
	getAllComics: (offset?: number) => Promise<IComic[]>
	getComic: (id: string) => Promise<IComic>
}
