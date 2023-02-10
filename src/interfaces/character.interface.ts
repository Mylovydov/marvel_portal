export interface ICharacter {
	id: number
	name: string
	description: string
	thumbnail: string
	homepage: string
	wiki: string
	comics: ICharComics[]
}

export interface ICharComics {
	comicsName: string
	id: string | null
}

export interface IComic {
	id: number
	image: string
	title: string
	price: number | string
	description: string
	pageCount: string
	language: string
}

export interface IComicsData {
	resourceURI: string
	name: string
}
