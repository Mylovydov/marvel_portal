import { ICharacter } from '../../interfaces/character.interface'

export interface IRandomCharState {
	char: ICharacter
	isLoading: boolean
	isError: boolean
}
