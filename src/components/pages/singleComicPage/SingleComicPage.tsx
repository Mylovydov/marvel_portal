import './singleComicPage.scss'
import { Link, useParams } from 'react-router-dom'
import useMarvelService from '../../../services/MarvelService'
import { useEffect, useState } from 'react'
import { IComic } from '../../../interfaces/character.interface'
import { Spinner } from '../../spinner'
import { ErrorMessage } from '../../errorMessage'

const View = (props: { comic: IComic }) => {
	const { title, description, image, price, pageCount, language } = props.comic

	return (
		<div className="single-comic">
			<img src={image} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	)
}

const SingleComicPage = () => {
	const { comicId } = useParams()
	const { getComic, isLoading, error, clearError } = useMarvelService()
	const [comic, setComic] = useState<IComic | null>(null)

	const onComicLoaded = (comic: IComic) => {
		setComic(comic)
	}

	const loadComic = () => {
		clearError()
		if (comicId) {
			getComic(comicId).then(onComicLoaded)
		}
	}

	useEffect(() => {
		loadComic()
	}, [comicId])

	const spinner = isLoading && <Spinner />
	const errorMessage = error && <ErrorMessage />
	const content = !(isLoading || error) && comic && <View comic={comic} />

	return (
		<>
			{spinner}
			{errorMessage}
			{content}
		</>
	)
}

export default SingleComicPage
