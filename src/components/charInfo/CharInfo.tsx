import './charInfo.scss'
import { CSSProperties } from 'react'
import { ICharInfoProps, IViewProps } from './charInfo.interface'
import { ICharComics } from '../../interfaces/character.interface'
import { Skeleton } from '../skeleton'
import { ErrorMessage } from '../errorMessage'
import { Spinner } from '../spinner'
import { Link } from 'react-router-dom'
import useCharacter from '../../hooks/useCharacter'

const CharInfo = ({ selectedCharId }: ICharInfoProps) => {
	const { isLoading, isError, data } = useCharacter(selectedCharId)

	const skeleton = !data && !isError && !isLoading && <Skeleton />
	const errorMessage = isError && <ErrorMessage />
	const spinner = isLoading && <Spinner />
	const content = !(isError || isLoading || !data) && <View char={data} />

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
