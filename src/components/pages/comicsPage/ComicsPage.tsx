import React, { FC, useEffect, useState } from 'react'
import useMarvelService from '../../../services/MarvelService'
import { IComic } from '../../../interfaces/character.interface'
import { ComicsList } from '../../comicsList'
import { ErrorBoundary } from '../../errorBoundary'
import './comicsPage.scss'
import { ProcessEnum } from '../../../hooks/useProcess/useProcess.interface'
import setComicsListContent from '../../../utils/setComicsListContent'

const ComicsPage: FC = () => {
	const { getAllComics, process, setProcess } = useMarvelService()

	const [comicsList, setComicsList] = useState<IComic[]>([])
	const [offset, setOffset] = useState<number>(200)
	const [isInitialLoading, setIsInitialLoading] = useState(true)

	const onRequest = (offset?: number) => {
		getAllComics(offset)
			.then(onComicsLoaded)
			.then(() => setProcess(ProcessEnum.CONFIRMED))
	}

	const onComicsLoaded = (comicsList: IComic[]) => {
		setComicsList(prevComicsList => [...prevComicsList, ...comicsList])
		setOffset(prevOffset => prevOffset + 8)
		setIsInitialLoading(false)
	}

	useEffect(() => {
		onRequest()
	}, [])

	return (
		<ErrorBoundary>
			<section className="comics-page">
				<div className="comics-page__body">
					{setComicsListContent(
						process,
						ComicsList,
						isInitialLoading,
						comicsList
					)}
				</div>
				<div className="comics-page__action">
					<button
						onClick={() => onRequest(offset)}
						disabled={
							process === ProcessEnum.LOADING || process === ProcessEnum.ERROR
						}
						className="button button__main button__long"
					>
						<div className="inner">
							{process === ProcessEnum.LOADING ? 'Loading...' : 'load more'}
						</div>
					</button>
				</div>
			</section>
		</ErrorBoundary>
	)
}

export default ComicsPage
