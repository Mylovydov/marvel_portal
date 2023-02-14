import React from 'react'
import { Helmet } from 'react-helmet'

interface IHeadProps {
	description: string
	title: string
}

const Head = ({ description, title }: IHeadProps) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<title>{title}</title>
		</Helmet>
	)
}

export default Head
