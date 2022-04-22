import AppBanner from '../appBanner/AppBanner';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {useParams} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePage = ({Component, dataType}) => {
	const {id} = useParams();
	const [data, setData] = useState(null);
	const {getComic, loading, error, clearError, getCharacter} = useMarvelService();

	useEffect(() => {
		updateData();
	}, [id]);

	const updateData = () => {
		clearError();

		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded);
				break;
			case 'character':
				getCharacter(id).then(onDataLoaded);
				break;
		}
	};

	console.log('data', data);

	const onDataLoaded = (info) => {
		setData(info);
	};

	const spinner = loading ? <Spinner/> : null;
	const errorMessage = error ? <ErrorMessage/> : null;
	const comicItem = !(error || loading || !data) ? <Component data={data}/> : null;

	return (
		<>
			<AppBanner/>
			{spinner}
			{errorMessage}
			{comicItem}
		</>
	);
};

export default SinglePage;