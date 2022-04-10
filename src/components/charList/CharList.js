import './charList.scss';
import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.marvelService.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError);
	}

	onCharListLoaded = (charList) => {
		this.setState({
			charList,
			loading: false
		});
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true
		});
	};

	renderItems = (arr) => {
		const items = arr.map(char => {
			const imgStyle = char.thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : {objectFit: 'cover'};

			return (
				<li
					className="char__item"
					key={char.id}
					onClick={() => this.props.onCharSelected(char.id)}
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

	render() {
		const {charList, loading, error} = this.state;

		const items = this.renderItems(charList);

		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(error || loading) ? items : null;

		return (
			<div className="char__list">
				{spinner}
				{errorMessage}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
};

export default CharList;