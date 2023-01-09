import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ComicsPage, MainPage, Page404 } from '../pages'
import { AppHeader } from '../appHeader'
import SingleComicPage from '../pages/singleComicPage/SingleComicPage'

const MarvelApp = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/comics" element={<ComicsPage />} />
						<Route path="/comics/:comicId" element={<SingleComicPage />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default MarvelApp
