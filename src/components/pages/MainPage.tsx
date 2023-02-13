import React, { FC, useCallback, useState } from 'react'
import { ErrorBoundary } from '../errorBoundary'
import { RandomChar } from '../randomChar'
import decoration from '../../resources/img/vision.png'
import { CharInfo } from '../charInfo'
import { CharList } from '../charList'
import SearchForm from '../searchForm/SearchForm'

const MainPage: FC = () => {
	const [selectedCharId, setSelectedCharId] = useState<number | null>(null)

	const onCharSelected = useCallback((id: number) => {
		setSelectedCharId(id)
	}, [])

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<div className="content__list">
					<ErrorBoundary>
						<CharList onCharSelected={onCharSelected} />
					</ErrorBoundary>
				</div>
				<div className="content__info">
					<ErrorBoundary>
						<CharInfo selectedCharId={selectedCharId} />
					</ErrorBoundary>
					<ErrorBoundary>
						<SearchForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage
