import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import {useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {Link} from 'react-router-dom';

import './charSearchForm.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (process, Found, NotFound, data) => {
	switch (process) {
		case 'waiting':
			return null;
		case 'loading':
			return null;
		case 'confirmed':
			return data.length > 0 ? <Found data={data[0]}/> : <NotFound/>;
		case 'error':
			return <div className="char__search-critical-error"><ErrorMessage/></div>;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharSearchForm = () => {
	const [char, setChar] = useState(null);
	const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

	const onCharLoaded = (char) => {
		setChar(char);
	};

	console.log('char', char);
	console.log('!char', !char);
	const updateChar = (name) => {
		clearError();

		getCharacterByName(name)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'));
	};

	const results = !char ? null : char.length > 0 ?
		<div className="char__search-wrapper">
			<div className="char__search-success">There is! Visit {char[0].name} page?</div>
			<Link to={`/characters/${char[0].id}`} className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div> :
		<div className="char__search-error">
			The character was not found. Check the name and try again
		</div>;


	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					charName: ''
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required('This field is required')
				})}
				onSubmit={({charName}) => {
					updateChar(charName);
				}}
			>
				<Form>
					<label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
					<div className="char__search-wrapper">
						<Field
							id="charName"
							name="charName"
							type="text"
							placeholder="Enter name"/>
						<button
							type="submit"
							className="button button__main"
							disabled={process === 'loading'}>
							<div className="inner">find</div>
						</button>
					</div>
					<FormikErrorMessage component="div" className="char__search-error" name="charName"/>
				</Form>
			</Formik>

			{setContent(process, charFounded, charNotFound, char)}
		</div>
	);
};

const charFounded = ({data}) => {
	const {name, id} = data;
	return (
		<div className="char__search-wrapper">
			<div className="char__search-success">There is! Visit {name} page?</div>
			<Link to={`/characters/${id}`} className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div>
	);
};

const charNotFound = () => {
	return (
		<div className="char__search-error">
			The character was not found. Check the name and try again
		</div>
	);
};

export default CharSearchForm;