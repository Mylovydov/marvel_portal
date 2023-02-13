import React from 'react'
import { useParams } from 'react-router-dom'
import { ICharacter, IComic } from '../../interfaces/character.interface'
import { Spinner } from '../../components/spinner'
import { ErrorMessage } from '../../components/errorMessage'
import IFetchFnType, {
	EnabledQueryKeyType
} from './withFetchComicOrCharData.interface'
import useMarvelServiceForQuery from '../../services/marvelServiceForQuery/marvelServiceForQuery'
import { useQuery } from 'react-query'

function WithFetchComicOrCharData<T>(
	WrappedComponent: React.ComponentType<T>,
	fetchFn: IFetchFnType = 'getComic',
	queryKey: EnabledQueryKeyType = 'singleComic'
) {
	return function WithFetchComicOrCharData(hokProps: Omit<T, 'item'>) {
		const { id } = useParams()
		const service = useMarvelServiceForQuery()

		const { data, isError, isLoading } = useQuery<IComic | ICharacter, Error>(
			[queryKey, id],
			() => service[fetchFn](id!),
			{
				enabled: !!id
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
