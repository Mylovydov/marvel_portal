import { ICharacter } from '../../interfaces/character.interface'

export interface ICharInfoProps {
	selectedCharId: number | null
}

export interface IViewProps {
	char: ICharacter
}
