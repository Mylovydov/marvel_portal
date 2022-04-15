import './charInfo.scss';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const CharInfo = ({charId}) => {
	const [charInfo, setCharInfo] = useState(null);

	const {loading, getCharacter, error, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
	}, []);

	useEffect(() => {
		updateChar();
	}, [charId]);

	const updateChar = () => {
		if (!charId) return;

		clearError();
		getCharacter(charId)
			.then(onCharInfoLoaded);
	};

	const onCharInfoLoaded = (charInfo) => {
		setCharInfo(charInfo);
	};

	const skeleton = charInfo || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !charInfo) ? <View char={charInfo}/> : null;


	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	const slicedComics = comics.slice(0, 10);
	const imgIsAvailable = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'};

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgIsAvailable}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{slicedComics.length
					?
					slicedComics.map((item, i) => {
						return (
							<li
								className="char__comics-item"
								key={i}
							>
								{item.name}
							</li>
						);
					})
					:
					'Selected character has no comics yet'
				}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number
};

export default CharInfo;


// class CharInfo extends Component {
// 	state = {
// 		charInfo: null,
// 		loading: false,
// 		error: false
// 	};
//
// 	marvelService = new MarvelService();
//
// 	componentDidMount() {
// 		this.updateChar();
// 	}
//
// 	componentDidUpdate(prevProps) {
// 		if (this.props.charId !== prevProps.charId) {
// 			this.updateChar();
// 		}
// 	}
//
// 	updateChar = () => {
// 		const {charId} = this.props;
// 		if (!charId) return;
//
// 		this.onCharInfoLoading();
//
// 		this.marvelService
// 			.getCharacter(charId)
// 			.then(this.onCharInfoLoaded)
// 			.catch(this.onError);
// 	};
//
// 	onCharInfoLoading = () => {
// 		this.setState({
// 			loading: true
// 		});
// 	};
//
// 	onCharInfoLoaded = (charInfo) => {
// 		this.setState({
// 			loading: false,
// 			charInfo
// 		});
// 	};
//
// 	onError = () => {
// 		this.setState({
// 			error: true
// 		});
// 	};
//
// 	render() {
// 		const {charInfo, loading, error} = this.state;
//
// 		const skeleton = charInfo || loading || error ? null : <Skeleton/>;
// 		const errorMessage = error ? <ErrorMessage/> : null;
// 		const spinner = loading ? <Spinner/> : null;
// 		const content = !(loading || error || !charInfo) ? <View char={charInfo}/> : null;
//
// 		return (
// 			<div className="char__info">
// 				{skeleton}
// 				{errorMessage}
// 				{spinner}
// 				{content}
// 			</div>
// 		);
// 	}
// };
