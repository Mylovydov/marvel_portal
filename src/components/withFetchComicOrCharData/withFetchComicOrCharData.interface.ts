import useMarvelService from '../../services/MarvelService'

type IFetchFnType = keyof Pick<
	ReturnType<typeof useMarvelService>,
	`getCharacter` | `getComic`
>
export default IFetchFnType
