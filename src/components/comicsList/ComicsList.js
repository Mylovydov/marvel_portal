import './comicsList.scss';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return newItemLoading ? <Component/> : <Spinner/>;
		case 'confirmed':
			return <Component/>;
		case 'error':
			return <ErrorMessage/>;
		default:
			throw new Error('Unexpected process state');
	}
};

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [offset, setOffset] = useState(220);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [comicsEnded, setComicsEnded] = useState(false);

	const {getAllComics, error, loading, process, setProcess} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
			.then(() => setProcess('confirmed'))
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;

		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList(comicsList => [...comicsList, ...newComicsList]);
		setOffset(offset => offset + 8);
		setNewItemsLoading(false);
		setComicsEnded(ended);
	};

	const renderItems = (comicsItems) => {
		const items = comicsItems.map((comicsItem, i) => {
			return (
				<li className="comics__item" key={i}>
					<Link to={`/comics/${comicsItem.id}`}>
						<img src={comicsItem.thumbnail} alt={comicsItem.title} className="comics__item-img"/>
						<div className="comics__item-name">{comicsItem.title}</div>
						<div className="comics__item-price">{comicsItem.price}</div>
					</Link>
				</li>
			);
		});

		return (
			<ul className="comics__grid">
				{items}
			</ul>
		);
	};

	return (
		<div className="comics__list">
			{setContent(process, () => renderItems(comicsList), newItemsLoading)}
			<button
				className="button button__main button__long"
				style={{display: comicsEnded ? 'none' : 'block'}}
				disabled={newItemsLoading}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">
					load more
				</div>
			</button>
		</div>
	);
};

export default ComicsList;
