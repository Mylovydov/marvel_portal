import React, { CSSProperties, forwardRef } from 'react'
import { IComicProps } from './comic.interface'
import './comic.scss'
import { Link, useNavigate } from 'react-router-dom'

const Comic = forwardRef<HTMLAnchorElement, IComicProps>(({ comic, onFocus, onBlur }, ref) => {
	const { image, title, price, id } = comic
	const navigate = useNavigate()

	const imgStyle: CSSProperties = {
		objectFit: `${image.includes('image_not_available') ? 'fill' : 'cover'}`
	}

	return (
		<div className="comic">
			<Link
				to={`${id}`}
				className="comic__img"
				ref={ref}
				onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
					if (e.code === 'Enter' || e.code === 'Space') {
						e.preventDefault()
						navigate(`/comics/${id}`)
					}
				}}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				<img style={imgStyle} src={image} alt={title} />
			</Link>
			<div className="comic__title">{title}</div>
			<div className="comic__price">{price}</div>
		</div>
	)
})

export default Comic
