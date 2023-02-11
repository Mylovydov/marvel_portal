import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SubpagesLayout from '../subpagesLayout/SubpagesLayout'
import { SingleCharPage, SingleComicPage } from '../pages'

const Page404 = lazy(() => import(`../pages/404`))
const MainPage = lazy(() => import(`../pages/MainPage`))
const ComicsPage = lazy(() => import(`../pages/comicsPage/ComicsPage`))

const MarvelRoutes = () => {
	return (
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
	)
}

export default MarvelRoutes
