import { IComic } from '../../interfaces/character.interface'

export interface IComicProps {
	comic: IComic

	onFocus(): void

	onBlur(): void
}
