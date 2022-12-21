import React from 'react'
import errorImg from './error.gif'
import './errorMessge.scss'

const ErrorMessage = () => {
	return <img src={errorImg} alt="Error Image" className="errorImg" />
}

export default ErrorMessage
