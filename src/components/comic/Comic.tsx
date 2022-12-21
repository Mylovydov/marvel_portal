import React, { forwardRef } from 'react'
import { IComicProps } from './comic.interface'
import './comic.scss'

const Comic = forwardRef<HTMLAnchorElement, IComicProps>(({ comic, onFocus, onBlur }, ref) => {
	const { image, uri, title, price } = comic

	return (
		<div className="comic">
			<a
				href="#"
				// href={uri}
				// target="_blank"
				className="comic__img"
				ref={ref}
				onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
					if (e.code === 'Enter' || e.code === 'Space') {
						e.preventDefault()
					}
				}}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				<img src={image} alt={title} />
			</a>
			<div className="comic__title">{title}</div>
			<div className="comic__price">{price}</div>
		</div>
	)
})

export default Comic
