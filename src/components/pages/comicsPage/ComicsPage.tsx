import React, { FC, useEffect, useState } from 'react'
import { IComic } from '../../../interfaces/character.interface'
import { ErrorMessage } from '../../errorMessage'
import { Spinner } from '../../spinner'
import { ComicsList } from '../../comicsList'
import { ErrorBoundary } from '../../errorBoundary'
import './comicsPage.scss'
import useMarvelServiceForQuery from '../../../services/marvelServiceForQuery/marvelServiceForQuery'
import { useQuery } from 'react-query'
import Head from '../../Head/Head'

const ComicsPage: FC = () => {
	const { getAllComics } = useMarvelServiceForQuery()

	const [comicsList, setComicsList] = useState<IComic[]>([])
	const [offset, setOffset] = useState<number>(200)
	const [isInitialLoading, setIsInitialLoading] = useState(true)

	const { data, isError, isLoading } = useQuery(['comics', offset], () =>
		getAllComics(offset)
	)

	const onGetComics = () => {
		setOffset(prevOffset => prevOffset + 8)
	}

	useEffect(() => {
		if (data) {
			setComicsList(prevComicsList => [...prevComicsList, ...data])
			setIsInitialLoading(false)
		}
	}, [data])

	const errorMessage = isError && <ErrorMessage />
	const spinner = isInitialLoading && !isError && <Spinner />
	const content = !(isLoading && isError) && <ComicsList comics={comicsList} />

	return (
		<>
			<Head
				title="Marvel portal | Comics page"
				description="Page with list of comics"
			/>
			<ErrorBoundary>
				<section className="comics-page">
					<div className="comics-page__body">
						{errorMessage}
						{spinner}
						{content}
					</div>
					<div className="comics-page__action">
						<button
							onClick={() => onGetComics()}
							disabled={isLoading || isError}
							className="button button__main button__long"
						>
							<div className="inner">
								{isLoading ? 'Loading...' : 'load more'}
							</div>
						</button>
					</div>
				</section>
			</ErrorBoundary>
		</>
	)
}

export default ComicsPage
