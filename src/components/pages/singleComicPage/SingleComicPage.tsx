import './singleComicPage.scss'
import { Link } from 'react-router-dom'
import ISingleComicProps from './singleComicPage.interface'
import WithFetchComicOrCharData from '../../withFetchComicOrCharData/WithFetchComicOrCharData'

const SingleComicPage = ({ item }: ISingleComicProps) => {
	const { title, description, image, price, pageCount, language } = item

	return (
		<div className="single-comic">
			<img src={image} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	)
}

export default WithFetchComicOrCharData(SingleComicPage, `comicId`, `getComic`)
