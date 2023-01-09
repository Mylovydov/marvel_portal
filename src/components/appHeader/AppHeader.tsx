import './appHeader.scss'
import { Link, NavLink } from 'react-router-dom'

const AppHeader = () => {
	return (
		<header className="app__header">
			<h1 className="app__title">
				<Link to="/">
					<span>Marvel</span> information portal
				</Link>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<NavLink
							end
							className={({ isActive }) => (isActive ? 'app__menu-active' : undefined)}
							to="/"
						>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? 'app__menu-active' : undefined)}
							to="/comics"
						>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader
