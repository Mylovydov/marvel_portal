import React, { FC, useState } from 'react'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import decoration from '../../resources/img/vision.png'

const MainPage: FC = () => {
	const [selectedCharId, setSelectedCharId] = useState<number | null>(null)

	const onCharSelected = (id: number) => {
		setSelectedCharId(id)
	}
	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo selectedCharId={selectedCharId} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage
