import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ComicsPage, MainPage } from '../pages'
import { AppHeader } from '../appHeader'
import Page404 from '../pages/404'

const MarvelApp = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/comics" element={<ComicsPage />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default MarvelApp
