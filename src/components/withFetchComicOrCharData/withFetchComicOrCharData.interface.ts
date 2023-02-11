import useMarvelService from '../../services/marvelService/MarvelService'

type IFetchFnType = keyof Pick<
	ReturnType<typeof useMarvelService>,
	`getCharacter` | `getComic`
>
export default IFetchFnType
