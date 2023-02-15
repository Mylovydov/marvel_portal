import {
	ICharacter,
	ICharComics,
	IComic,
	IComicsData
} from '../interfaces/character.interface'

export const transformCharComics = (comics: IComicsData[]): ICharComics[] => {
	if (!comics.length) {
		return []
	}
	const comicsItems = []
	for (let i = 0; i <= 10; i++) {
		if (!comics[i]?.name || !comics[i]?.resourceURI) {
			break
		}
		const regExp = /\d{5}$/
		const comicId = comics[i].resourceURI.match(regExp)?.[0] || null
		comicsItems.push({
			comicsName: comics[i].name,
			id: comicId
		})
	}
	return comicsItems
}

export const transformCharacter = (char: any): ICharacter => ({
	id: char.id,
	name: char.name,
	description: char.description
		? char.description
		: 'This character does not have a description',
	thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
	homepage: char.urls[0].url,
	wiki: char.urls[1].url,
	comics: transformCharComics(char.comics.items)
})

export const transformComic = (comic: any): IComic => ({
	id: comic.id,
	image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
	title: comic.title.toLocaleUpperCase(),
	price: comic?.prices?.[0]?.price
		? comic.prices[0].price + '$'
		: 'Not available',
	description: comic.description || `No description for this comic`,
	pageCount: comic.pageCount
		? `${comic.pageCount} p.`
		: 'No information about the number of pages',
	language: comic.textObjects.language || `en-us`
})
