import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader'
import { Spinner } from '../spinner'
import SubpagesLayout from '../subpagesLayout/SubpagesLayout'
import { SingleCharPage, SingleComicPage } from '../pages'

const Page404 = lazy(() => import(`../pages/404`))

const MainPage = lazy(() => import(`../pages/MainPage`))
const ComicsPage = lazy(() => import(`../pages/comicsPage/ComicsPage`))

const MarvelApp = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/comics" element={<SubpagesLayout />}>
								<Route index element={<ComicsPage />} />
								<Route path=":comicId" element={<SingleComicPage />} />
							</Route>
							<Route path="/character" element={<SubpagesLayout />}>
								<Route index path=":charId" element={<SingleCharPage />} />
							</Route>
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default MarvelApp
