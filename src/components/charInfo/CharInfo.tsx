import './charInfo.scss'
import { CSSProperties, useEffect, useState } from 'react'
import { ICharInfoProps, IViewProps } from './charInfo.interface'
import { ICharacter, ICharComics } from '../../interfaces/character.interface'
import useMarvelService from '../../services/MarvelService'
import { Link } from 'react-router-dom'
import setContent from '../../utils/setContent'
import { ProcessEnum } from '../../hooks/useProcess/useProcess.interface'

const CharInfo = ({ selectedCharId }: ICharInfoProps) => {
	const { getCharacter, clearError, process, setProcess } = useMarvelService()

	const [char, setChar] = useState<ICharacter | null>(null)

	useEffect(() => {
		onUpdateChar()
	}, [selectedCharId])

	const onCharLoaded = (char: ICharacter) => {
		setChar(char)
	}

	const onUpdateChar = () => {
		if (!selectedCharId) {
			return
		}
		clearError()
		getCharacter(selectedCharId)
			.then(onCharLoaded)
			.then(() => setProcess(ProcessEnum.CONFIRMED))
	}

	// const skeleton = !char && !error && !isLoading && <Skeleton />
	// const errorMessage = error && <ErrorMessage />
	// const spinner = isLoading && <Spinner />
	// const content = !(error || isLoading || !char) && <View char={char} />

	return <div className="char__info">{setContent(process, View, char)}</div>
}

const View = ({ data }: IViewProps) => {
	const { name, description, homepage, thumbnail, wiki, comics } = data

	const comicsItems = comics.length
		? comics.map((comicsItem: ICharComics, i: number) => (
				<li className="char__comics-item" key={i}>
					{comicsItem.id ? (
						<Link to={`/comics/${comicsItem.id}`}>{comicsItem.comicsName}</Link>
					) : (
						comicsItem.comicsName
					)}
				</li>
		  ))
		: 'No available comics'

	const imgStyle: CSSProperties = {
		objectFit: `${
			thumbnail.includes('image_not_available') ? 'contain' : 'cover'
		}`
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
			<div className="char__descr">{`${description.slice(0, 210)}...`}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">{comicsItems}</ul>
		</>
	)
}

export default CharInfo
