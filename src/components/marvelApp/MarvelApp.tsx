import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ComicsPage, MainPage } from '../pages'
import { AppHeader } from '../appHeader'

const MarvelApp = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/comics" component={ComicsPage} />
					</Switch>
				</main>
			</div>
		</Router>
	)
}

export default MarvelApp
