import React, { FC, useEffect, useRef, useState } from 'react'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import PromotionBanner from '../promotionBanner/PromotionBanner'
import avengers from '../../resources/img/Avengers.png'
import logo from '../../resources/img/Avengers_logo.png'
import useMarvelService from '../../services/MarvelService'
import { IComic } from '../../interfaces/character.interface'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

const ComicsPage: FC = () => {
	const { getAllComics, isLoading, error } = useMarvelService()

	const [comicsList, setComicsList] = useState<IComic[]>([])
	const [offset, setOffset] = useState<number>(200)
	const [isInitialLoading, setIsInitialLoading] = useState(true)

	const onRequest = (offset?: number) => {
		getAllComics(offset).then(onComicsLoaded)
	}

	const onComicsLoaded = (comicsList: IComic[]) => {
		setComicsList(prevComicsList => [...prevComicsList, ...comicsList])
		setOffset(prevOffset => prevOffset + 8)
		setIsInitialLoading(false)
	}

	useEffect(() => {
		onRequest()
	}, [])

	const comicsRefs = useRef<HTMLAnchorElement[]>([])

	const setFocusOnSelectedComic = (id: number) => {
		const selectedComic = comicsRefs.current[id]
		selectedComic.classList.add('comic__img-selected')
		selectedComic.focus()
	}

	const removeFocusOnSelectedComic = (id: number) => {
		const selectedComic = comicsRefs.current[id]
		selectedComic.classList.remove('comic__img-selected')
	}

	const renderComics = (comics: IComic[]) =>
		comics.map(({ price, title, uri, image, id }: IComic, i) => (
			<li key={id} className="comics-list__comic">
				<div className="comic">
					<a
						href="#"
						// href={uri}
						// target="_blank"
						className="comic__img"
						ref={el => (el ? (comicsRefs.current[i] = el) : undefined)}
						onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
							if (e.code === 'Enter' || e.code === 'Space') {
								e.preventDefault()
							}
						}}
						onFocus={() => setFocusOnSelectedComic(i)}
						onBlur={() => removeFocusOnSelectedComic(i)}
					>
						<img src={image} alt={title} />
					</a>
					<div className="comic__title">{title}</div>
					<div className="comic__price">{price}</div>
				</div>
			</li>
		))

	const comicsItems = renderComics(comicsList)

	const errorMessage = error && <ErrorMessage />
	const spinner = isInitialLoading && !error && <Spinner />
	const content = !(isLoading && error) && comicsItems

	return (
		<ErrorBoundary>
			<section className="comics-page">
				<div className="comics-page__header">
					<PromotionBanner
						startImg={avengers}
						endImg={logo}
						text="New comics every week! Stay tuned!"
					/>
				</div>
				<div className="comics-page__body"></div>
				<div className="comics-page__action">
					<button
						onClick={() => onRequest(offset)}
						disabled={isLoading || !!error}
						className="button button__main button__long"
					>
						<div className="inner">{isLoading ? 'Loading...' : 'load more'}</div>
					</button>
				</div>
			</section>
			{/*<ComicsList1 />*/}
		</ErrorBoundary>
	)
}

export default ComicsPage
