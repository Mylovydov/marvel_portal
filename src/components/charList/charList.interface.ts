import { ICharacter } from '../../interfaces/character.interface'

export interface ICharListState {
	charList: ICharacter[]
	isInitialLoading: boolean
	isLoading: boolean
	isError: boolean
	offset: number
}

export interface ICharListProps {
	onCharSelected: (id: number) => void
}
