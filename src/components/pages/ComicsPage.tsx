import React, { FC, useEffect, useState } from 'react'
import { PromotionBanner } from '../promotionBanner'
import avengers from '../../resources/img/Avengers.png'
import logo from '../../resources/img/Avengers_logo.png'
import useMarvelService from '../../services/MarvelService'
import { IComic } from '../../interfaces/character.interface'
import { ErrorMessage } from '../errorMessage'
import { Spinner } from '../spinner'
import { ComicsList } from '../comicsList'
import { ErrorBoundary } from '../errorBoundary'

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

	const errorMessage = error && <ErrorMessage />
	const spinner = isInitialLoading && !error && <Spinner />
	const content = !(isLoading && error) && <ComicsList comics={comicsList} />

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
				<div className="comics-page__body">
					{errorMessage}
					{spinner}
					{content}
				</div>
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
		</ErrorBoundary>
	)
}

export default ComicsPage
