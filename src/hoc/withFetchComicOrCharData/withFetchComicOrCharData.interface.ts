import useMarvelServiceForQuery from '../../services/marvelServiceForQuery/marvelServiceForQuery'

type IFetchFnType = keyof Pick<
	ReturnType<typeof useMarvelServiceForQuery>,
	`getCharacter` | `getComic`
>

export type EnabledQueryKeyType = 'singleComic' | 'singleCharacter'
export type EnabledParamsNameType = 'comicId' | 'charId'
export default IFetchFnType
