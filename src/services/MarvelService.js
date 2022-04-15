import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

	const {loading, error, request, clearError} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=d423d5fe13c364f3025f9ffe33f5eef1';
	const _baseOffset = 220;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		};
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
			price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE'
		};
	};

	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics
	};
};

export default useMarvelService;