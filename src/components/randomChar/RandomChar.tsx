import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import { CSSProperties, useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import { ICharacter } from '../../interfaces/character.interface'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const ViewBox = ({ char }: { char: ICharacter }) => {
	const { name, description, homepage, thumbnail, wiki } = char

	const imgStyle: CSSProperties = {
		objectFit: `${thumbnail.includes('image_not_available') ? 'contain' : 'cover'}`
	}

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

const RandomChar = () => {
	const { isLoading, error, getCharacter, clearError } = useMarvelService()

	const [char, setChar] = useState<ICharacter | null>(null)

	useEffect(() => {
		updateChar()
	}, [])

	const onCharLoaded = (char: ICharacter) => {
		setChar(char)
	}

	const updateChar = () => {
		clearError()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id).then(onCharLoaded)
	}

	const errorMessage = error && <ErrorMessage />
	const spinner = isLoading && <Spinner />
	const content = !(error || isLoading) && char && <ViewBox char={char} />

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button className="button button__main">
					<div className="inner" onClick={() => updateChar()}>
						try it
					</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)
}

export default RandomChar
