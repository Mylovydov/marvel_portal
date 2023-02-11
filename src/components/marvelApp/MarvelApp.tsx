import React from 'react'
import { AppHeader } from '../appHeader'
import MarvelRoutes from '../marvelRoutes/MarvelRoutes'

const MarvelApp = () => {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<MarvelRoutes />
			</main>
		</div>
	)
}

export default MarvelApp
