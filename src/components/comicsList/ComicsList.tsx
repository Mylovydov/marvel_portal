import './comicsList.scss'
import React from 'react'

const ComicsList = () => {
	return (
		<ul className="comics-list">
			{spinner}
			{errorMessage}
			{content}
		</ul>
	)
}

export default ComicsList
