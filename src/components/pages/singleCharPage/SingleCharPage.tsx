import React from 'react'
import './singleCharPage.scss'
import SingleCharProps from './singleCharPage.interface'
import WithFetchComicOrCharData from '../../../hoc/withFetchComicOrCharData/WithFetchComicOrCharData'
import Head from '../../Head/Head'

const SingleCharPage = ({ item }: SingleCharProps) => {
	const { name, thumbnail, description } = item
	return (
		<>
			<Head
				title={`Marvel portal | ${name}`}
				description={`${name} comics character`}
			/>
			<div className="single-char">
				<div className="single-char__image">
					<img src={thumbnail} alt={name} className="single-char__img" />
				</div>

				<div className="single-char__info">
					<h1 className="single-char__name">{name}</h1>
					<p className="single-char__descr">{description}</p>
				</div>
			</div>
		</>
	)
}

export default WithFetchComicOrCharData(
	SingleCharPage,
	'getCharacter',
	'singleCharacter'
)
