import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../errorMessage'

const Page404 = () => {
	const location = useLocation()
	const navigate = useNavigate()
	
	return (
		<div style={{ textAlign: 'center' }}>
			<ErrorMessage />
			<h3 style={{ marginTop: 30 }}>{`Path "${location.pathname}" is not found`}</h3>
			<button
				style={{ marginTop: 30 }}
				className="button button__main button__long"
				onClick={() => navigate(-1)}
			>
				<div className="inner">Back</div>
			</button>
		</div>
	)
}

export default Page404
