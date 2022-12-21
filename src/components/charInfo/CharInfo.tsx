import './charInfo.scss'
import { CSSProperties, useEffect, useState } from 'react'
import { ICharInfoProps, IViewProps } from './charInfo.interface'
import { ICharacter, ICharComics } from '../../interfaces/character.interface'
import useMarvelService from '../../services/MarvelService'
import { Skeleton } from '../skeleton'
import { ErrorMessage } from '../errorMessage'
import { Spinner } from '../spinner'

const CharInfo = (props: ICharInfoProps) => {
	const { isLoading, error, getCharacter, clearError } = useMarvelService()

	const [char, setChar] = useState<ICharacter | null>(null)

	const { selectedCharId } = props

	useEffect(() => {
		onUpdateChar()
	}, [])

	useEffect(() => {
		onUpdateChar()
	}, [selectedCharId])

	const onCharLoaded = (char: ICharacter) => {
		setChar(char)
	}

	const onUpdateChar = () => {
		clearError()
		if (selectedCharId) {
			getCharacter(selectedCharId).then(onCharLoaded)
		}
	}

	const skeleton = !char && !error && !isLoading && <Skeleton />
	const errorMessage = error && <ErrorMessage />
	const spinner = isLoading && <Spinner />
	const content = !(error || isLoading || !char) && <View char={char} />

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ char }: IViewProps) => {
	const { name, description, homepage, thumbnail, wiki, comics } = char

	const comicsItems = comics.length
		? comics.map((comicsItem: ICharComics, i: number) => (
				<li className="char__comics-item" key={i}>
					{comicsItem.comicsName}
				</li>
		  ))
		: 'No available comics'

	const imgStyle: CSSProperties = {
		objectFit: `${thumbnail.includes('image_not_available') ? 'contain' : 'cover'}`
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">{comicsItems}</ul>
		</>
	)
}

export default CharInfo
