import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ErrorMessage } from '../errorMessage'

const Page404 = () => {
	const location = useLocation()
	return (
		<div style={{ textAlign: 'center' }}>
			<ErrorMessage />
			<h3 style={{ marginTop: 30 }}>{`Path "${location.pathname}" is not found`}</h3>
			<Link style={{ marginTop: 30 }} to="..">
				Back
			</Link>
		</div>
	)
}

export default Page404
