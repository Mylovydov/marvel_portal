import AppBanner from '../appBanner/AppBanner';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {useParams} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
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

const SinglePage = ({Component, dataType}) => {
	const {id} = useParams();
	const [data, setData] = useState(null);

	const {getComic, clearError, getCharacter, process, setProcess} = useMarvelService();
	console.log(id);
	useEffect(() => {
		updateData();
	}, [id]);

	const updateData = () => {
		clearError();

		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
				break;
			case 'character':
				getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
				break;
		}
	};

	console.log('data', data);

	const onDataLoaded = (info) => {
		setData(info);
	};

	return (
		<>
			<AppBanner/>
			{setContent(process, Component, data)}
		</>
	);
};

export default SinglePage;