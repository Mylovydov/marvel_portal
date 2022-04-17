import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {Link, useParams} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicsPage = () => {
	const [comic, setComic] = useState({});

	const {getComic, loading, error, clearError} = useMarvelService();
	const {comicId} = useParams();

	useEffect(() => {
		updateComic();
	}, [comicId]);

	const updateComic = () => {
		clearError();
		getComic(comicId)
			.then(onComicLoaded);
	};

	const onComicLoaded = (comic) => {
		setComic(comic);
	};

	const spinner = loading ? <Spinner/> : null;
	const errorMessage = error ? <ErrorMessage/> : null;
	const comicItem = !(error || loading || !comic) ? <View comic={comic}/> : null;

	return (
		<>
			{spinner}
			{errorMessage}
			{comicItem}
		</>
	);
};

const View = ({comic}) => {
	const {title, description, pageCount, language, price, thumbnail} = comic;

	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img"/>
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">
					{description}
				</p>
				<p className="single-comic__descr">
					{pageCount}
				</p>
				<p className="single-comic__descr">
					Language: {language}
				</p>
				<div className="single-comic__price">
					{price}
				</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicsPage;