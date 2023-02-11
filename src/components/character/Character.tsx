import React, { CSSProperties } from 'react'
import './character.scss'
import useCharacter from '../../hooks/useCharacter'
import { ErrorMessage } from '../errorMessage'
import Spinner from '../spinner/Spinner'
import ICharacterPropsType from './character.interface'

const Character = ({ id }: ICharacterPropsType) => {
	const { isLoading, data, isError } = useCharacter(id)

	const imgStyle: CSSProperties = {
		objectFit: `${
			data?.thumbnail.includes('image_not_available') ? 'contain' : 'cover'
		}`
	}

	if (isError) {
		return <ErrorMessage />
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="character">
			<img
				src={data?.thumbnail}
				alt="Character image"
				className="character__img"
				style={imgStyle}
			/>
			<div className="character__info">
				<p className="character__name">{data?.name}</p>
				<p className="character__descr">{data?.description}</p>
				<div className="character__btns">
					<a href={data?.homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={data?.wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Character
