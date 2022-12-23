import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Page404 = () => {
	const location = useLocation()
	console.log(location)
	return (
		<>
			{' '}
			<h3>{`Path "${location.pathname}" is not found`}</h3>
			<NavLink to="..">Back</NavLink>
		</>
	)
}

export default Page404
