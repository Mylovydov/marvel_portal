import { ICharacter } from '../../interfaces/character.interface'

export interface ICharInfoProps {
	selectedCharId: number | null
}

export interface ICharInfoState {
	char: ICharacter | null
	isLoading: boolean
	isError: boolean
}

export interface IViewProps {
	char: ICharacter
}
