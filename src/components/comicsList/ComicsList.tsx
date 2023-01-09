import './comicsList.scss'
import React, { useRef } from 'react'
import Comic from '../comic/Comic'
import { IComicsListProps } from './comicsList.interface'

const ComicsList = ({ comics }: IComicsListProps) => {
	const comicsRefs = useRef<HTMLAnchorElement[]>([])

	const setFocusOnSelectedComic = (id: number) => {
		const selectedComic = comicsRefs.current[id]
		selectedComic.classList.add('comic__img-selected')
		selectedComic.focus()
	}

	const removeFocusOnSelectedComic = (id: number) => {
		const selectedComic = comicsRefs.current[id]
		selectedComic.classList.remove('comic__img-selected')
	}

	return (
		<ul className="comics-list">
			{comics.map((comic, i) => (
				<li key={i} className="comics-list__comic">
					<Comic
						comic={comic}
						onFocus={() => setFocusOnSelectedComic(i)}
						onBlur={() => removeFocusOnSelectedComic(i)}
						ref={el => {
							if (el) {
								comicsRefs.current[i] = el
							}
						}}
					/>
				</li>
			))}
		</ul>
	)
}

export default ComicsList
