import React from 'react'
import { useParams } from 'react-router-dom'
import { ICharacter, IComic } from '../../interfaces/character.interface'
import { Spinner } from '../../components/spinner'
import { ErrorMessage } from '../../components/errorMessage'
import IFetchFnType, {
	EnabledParamsNameType,
	EnabledQueryKeyType
} from './withFetchComicOrCharData.interface'
import useMarvelServiceForQuery from '../../services/marvelServiceForQuery/marvelServiceForQuery'
import { useQuery } from 'react-query'

function WithFetchComicOrCharData<T>(
	WrappedComponent: React.ComponentType<T>,
	paramsName: EnabledParamsNameType = 'comicId',
	fetchFn: IFetchFnType = 'getComic',
	queryKey: EnabledQueryKeyType = 'singleComic'
) {
	return function WithFetchComicOrCharData(hokProps: Omit<T, 'item'>) {
		const params = useParams()
		const service = useMarvelServiceForQuery()

		const comicOrCharId = params[paramsName]

		const { data, isError, isLoading } = useQuery<IComic | ICharacter, Error>(
			[queryKey, comicOrCharId],
			() => service[fetchFn](comicOrCharId!),
			{
				enabled: !!comicOrCharId
			}
		)

		const spinner = isLoading && <Spinner />
		const errorMessage = isError && <ErrorMessage />
		const content = !(isLoading || isError) && data && (
			<WrappedComponent {...(hokProps as T)} item={data} />
		)

		return (
			<>
				{spinner}
				{errorMessage}
				{content}
			</>
		)
	}
}

export default WithFetchComicOrCharData
