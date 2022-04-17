import './charList.scss';
import {useEffect, useRef, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = ({onCharSelected}) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(220);
	const [charEnded, setCharEnded] = useState(false);

	const {loading, getAllCharacters, error} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offfset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offfset)
			.then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {

		let ended = false;

		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList(charList => [...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	};

	const comicsRef = useRef([]);

	const focusOnItem = (id) => {
		comicsRef.current.forEach(item => item.classList.remove('char__item_selected'));
		comicsRef.current[id].classList.add('char__item_selected');
		comicsRef.current[id].focus();
	};

	const onComicsClick = (charId, refId) => {
		onCharSelected(charId);
		focusOnItem(refId);
	};

	const onSelectedChar = (e, charId, i) => {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			onCharSelected(charId);
			focusOnItem(i);
		}
	};

	const renderItems = (arr) => {
		const items = arr.map((char, i) => {
			const imgStyle = char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : {objectFit: 'cover'};

			return (
				<li
					className="char__item"
					tabIndex={0}
					key={i}
					ref={el => comicsRef.current[i] = el}
					onClick={() => onComicsClick(char.id, i)}
					onKeyPress={(e) => onSelectedChar(e, char.id, i)}
				>
					<img src={char.thumbnail} alt={char.name} style={imgStyle}/>
					<div className="char__name">{char.name}</div>
				</li>
			);
		});

		return (
			<ul className="char__grid">
				{items}
			</ul>
		);
	};

	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;

	return (
		<div className="char__list">
			{spinner}
			{errorMessage}
			{items}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				disabled={newItemLoading}
				style={{display: charEnded || loading ? 'none' : 'block'}}
			>
				<div className="inner">
					load more
				</div>
			</button>
		</div>
	);
};

export default CharList;