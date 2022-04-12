import './charList.scss';
import {useEffect, useRef, useState} from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';

const CharList = ({onCharSelected}) => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(220);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		onRequest();
	}, []);

	const onRequest = (offset) => {
		onCharListLoading();
		marvelService.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError);
	};

	const onCharListLoading = () => {
		setNewItemLoading(true);
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;

		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setOffset((offset) => offset + 9);
		setLoading(false);
		setNewItemLoading(false);
		setCharEnded(ended);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
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

	const renderItems = (arr) => {
		const items = arr.map((char, i) => {
			const imgStyle = char.thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : {objectFit: 'cover'};

			return (
				<li
					className="char__item"
					tabIndex={0}
					key={char.id}
					ref={el => comicsRef.current[i] = el}
					onClick={() => onComicsClick(char.id, i)}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							e.preventDefault();
							onCharSelected(char.id);
							focusOnItem(i);
						}
					}}
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
	const spinner = loading ? <Spinner/> : null;
	const content = !(error || loading) ? items : null;

	return (
		<div className="char__list">
			{spinner}
			{errorMessage}
			{content}
			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				disabled={newItemLoading}
				style={{display: charEnded ? 'none' : 'block'}}
			>
				<div className="inner">
					load more
				</div>
			</button>
		</div>
	);
};


// class CharList extends Component {
// 	state = {
// 		charList: [],
// 		loading: true,
// 		error: false,
// 		newItemLoading: false,
// 		offset: 220,
// 		charEnded: false,
// 		refComics: []
// 	};
//
// 	marvelService = new MarvelService();
//
// 	componentDidMount() {
// 		this.onRequest();
// 	}
//
// 	onRequest = (offset) => {
// 		this.onCharListLoading();
// 		this.marvelService.getAllCharacters(offset)
// 			.then(this.onCharListLoaded)
// 			.catch(this.onError);
// 	};
//
// 	onCharListLoading = () => {
// 		this.setState({
// 			newItemLoading: true
// 		});
// 	};
//
// 	onCharListLoaded = (newCharList) => {
// 		let ended = false;
//
// 		if (newCharList.length < 9) {
// 			ended = true;
// 		}
// 		this.setState(({charList, offset}) => ({
// 			charList: [...charList, ...newCharList],
// 			loading: false,
// 			newItemLoading: false,
// 			offset: offset + 9,
// 			charEnded: ended
// 		}));
// 	};
//
// 	onError = () => {
// 		this.setState({
// 			loading: false,
// 			error: true
// 		});
// 	};
//
// 	comicsRef = [];
//
// 	setComicsRef = elem => {
// 		this.comicsRef.push(elem);
// 	};
//
// 	focusOnItem = (id) => {
// 		this.comicsRef.forEach(item => item.classList.remove('char__item_selected'));
// 		this.comicsRef[id].classList.add('char__item_selected');
// 		this.comicsRef[id].focus();
// 	};
//
// 	onComicsClick = (charId, refId) => {
// 		this.props.onCharSelected(charId);
// 		this.focusOnItem(refId);
// 	};
//
// 	renderItems = (arr) => {
// 		const items = arr.map((char, i) => {
// 			const imgStyle = char.thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : {objectFit: 'cover'};
//
// 			return (
// 				<li
// 					className="char__item"
// 					tabIndex={0}
// 					key={char.id}
// 					ref={this.setComicsRef}
// 					onClick={() => this.onComicsClick(char.id, i)}
// 					onKeyPress={(e) => {
// 						if (e.key === ' ' || e.key === 'Enter') {
// 							e.preventDefault();
// 							this.props.onCharSelected(char.id);
// 							this.focusOnItem(i);
// 						}
// 					}}
// 				>
// 					<img src={char.thumbnail} alt={char.name} style={imgStyle}/>
// 					<div className="char__name">{char.name}</div>
// 				</li>
// 			);
// 		});
//
// 		return (
// 			<ul className="char__grid">
// 				{items}
// 			</ul>
// 		);
// 	};
//
// 	render() {
// 		const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
//
// 		const items = this.renderItems(charList);
//
// 		const errorMessage = error ? <ErrorMessage/> : null;
// 		const spinner = loading ? <Spinner/> : null;
// 		const content = !(error || loading) ? items : null;
//
// 		return (
// 			<div className="char__list">
// 				{spinner}
// 				{errorMessage}
// 				{content}
// 				<button
// 					className="button button__main button__long"
// 					onClick={() => this.onRequest(offset)}
// 					disabled={newItemLoading}
// 					style={{display: charEnded ? 'none' : 'block'}}
// 				>
// 					<div className="inner">
// 						load more
// 					</div>
// 				</button>
// 			</div>
// 		);
// 	}
// };

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
};

export default CharList;