import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import { CSSProperties, useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import { ICharacter } from '../../interfaces/character.interface'
import setContent from '../../utils/setContent'
import { ProcessEnum } from '../../hooks/useProcess/useProcess.interface'

const View = ({ data }: { data: ICharacter }) => {
	const { name, description, homepage, thumbnail, wiki } = data

	const imgStyle: CSSProperties = {
		objectFit: `${
			thumbnail.includes('image_not_available') ? 'contain' : 'cover'
		}`
	}

	return (
		<div className="randomchar__block">
			<img
				src={thumbnail}
				alt="Random character"
				className="randomchar__img"
				style={imgStyle}
			/>
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
	const { getCharacter, clearError, process, setProcess } = useMarvelService()

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
		getCharacter(id)
			.then(onCharLoaded)
			.then(() => setProcess(ProcessEnum.CONFIRMED))
	}

	return (
		<div className="randomchar">
			{setContent(process, View, char)}
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
