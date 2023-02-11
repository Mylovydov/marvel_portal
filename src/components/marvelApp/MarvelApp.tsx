import React, { Suspense } from 'react'
import { AppHeader } from '../appHeader'
import { Spinner } from '../spinner'
import MarvelRoutes from '../marvelRoutes/MarvelRoutes'

const MarvelApp = () => {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<Suspense fallback={<Spinner />}>
					<MarvelRoutes />
				</Suspense>
			</main>
		</div>
	)
}

export default MarvelApp
