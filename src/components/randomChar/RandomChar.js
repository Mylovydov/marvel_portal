import {useEffect, useState} from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
	switch (process) {
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return <Spinner/>;
		case 'confirmed':
			return <Component data={data}/>;
		case 'error':
			return <ErrorMessage/>;
		default:
			throw new Error('Unexpected process state');
	}
};

const RandomChar = () => {
	const [char, setChar] = useState({});

	const {getCharacter, loading, clearError, setProcess, process} = useMarvelService();

	useEffect(() => {
		updateChar();

		const timerId = setInterval(updateChar, 40000);
		return () => {
			clearInterval(timerId);
		};
	}, []);

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'))
	};

	const onCharLoaded = (char) => {
		setChar({...char});
	};

	return (
		<div className="randomchar">
			{setContent(process, View, char)}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button
					className="button button__main"
					disabled={loading}
				>
					<div className="inner" onClick={() => updateChar()}>try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	);
};

const View = ({data}) => {
	const {name, description, thumbnail, homepage, wiki} = data;
	const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : {objectFit: 'cover'};

	return (
		<div className="randomchar__block">
			<img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description ? description.substring(0, 150) + '...' : 'No data for this character'}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};
export default RandomChar;


// class RandomChar extends Component {
// 	state = {
// 		char: {},
// 		loading: true,
// 		error: false
// 	};
//
// 	marvelService = new MarvelService();
//
// 	componentDidMount() {
// 		this.updateChar();
// 		this.timeId = setInterval(this.updateChar, 3000);
// 	}
//
// 	componentWillUnmount() {
// 		clearInterval(this.timeId);
// 	}
//
// 	onCharLoaded = (char) => {
// 		this.setState({
// 			char,
// 			loading: false
// 		});
// 	};
//
// 	onCharLoading = () => {
// 		this.setState({
// 			loading: true
// 		});
// 	};
//
// 	onError = () => {
// 		this.setState({
// 			loading: false,
// 			error: true
// 		});
// 	};
//
// 	updateChar = () => {
// 		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
// 		this.onCharLoading();
// 		this.marvelService
// 			.getCharacter(id)
// 			.then(this.onCharLoaded)
// 			.catch(this.onError);
// 	};
//
// 	render() {
// 		const {char, loading, error} = this.state;
//
// 		const errorMessage = error ? <ErrorMessage/> : null;
// 		const spinner = loading ? <Spinner/> : null;
// 		const content = !(loading || error) ? <View char={char}/> : null;
//
// 		return (
// 			<div className="randomchar">
// 				{errorMessage}
// 				{spinner}
// 				{content}
// 				<div className="randomchar__static">
// 					<p className="randomchar__title">
// 						Random character for today!<br/>
// 						Do you want to get to know him better?
// 					</p>
// 					<p className="randomchar__title">
// 						Or choose another one
// 					</p>
// 					<button className="button button__main">
// 						<div className="inner" onClick={() => this.updateChar()}>try it</div>
// 					</button>
// 					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
// 				</div>
// 			</div>
// 		);
// 	}
// };
