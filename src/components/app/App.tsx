import decoration from '../../resources/img/vision.png'
import React, { useState } from 'react'
import RandomChar from '../randomChar/RandomChar'

const App = () => {
	const [selectedCharId, setSelectedCharId] = useState<number | null>(null)

	const onCharSelected = (id: number) => {
		setSelectedCharId(id)
	}

	return (
		<div className="app">
			{/*<AppHeader />*/}
			<main>
				<div>EBANA ROT!!!!!</div>
				<RandomChar />
				<div className="char__content">
					{/*<CharList />*/}
					{/*<CharInfo />*/}
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	)
}

export default App
