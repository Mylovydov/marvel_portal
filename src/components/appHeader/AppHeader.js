import './appHeader.scss';
import {Link, NavLink} from 'react-router-dom';

const AppHeader = () => {
	const activeStyle = {
		fontWeight: 'bold',
		color: '#9f0013'
	};

	return (
		<header className="app__header">
			<h1 className="app__title">
				<Link to="/">
					<span>Marvel</span>
					information portal
				</Link>
			</h1>
			<nav className="app__menu">
				<ul>
					<li>
						<NavLink
							end
							to="/"
							style={({isActive}) => isActive ? activeStyle : {}}
						>
							Characters
						</NavLink>
					</li>
					/
					<li>
						<NavLink
							to="/comics"
							style={({isActive}) => isActive ? activeStyle : {}}
						>
							Comics
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default AppHeader;