import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import { ICharacter, IComic } from '../../interfaces/character.interface'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../errorMessage'
import IFetchFnType from './withFetchComicOrCharData.interface'

function WithFetchComicOrCharData<T>(
	WrappedComponent: React.ComponentType<T>,
	paramsName: string,
	fetchFn: IFetchFnType
) {
	return function WithFetchComicOrCharData(hokProps: Omit<T, `item`>) {
		const params = useParams()
		const comicOrCharId = params[paramsName]

		const service = useMarvelService()
		const [comicOrChar, setComicOrChar] = useState<IComic | ICharacter | null>(
			null
		)

		const onComicLoaded = (comicOrChar: IComic | ICharacter | null) => {
			if (comicOrChar) {
				setComicOrChar(comicOrChar)
			}
		}

		const loadComic = () => {
			service.clearError()
			if (comicOrCharId) {
				service[fetchFn](comicOrCharId).then(onComicLoaded)
			}
		}

		useEffect(() => {
			loadComic()
		}, [comicOrCharId])

		const spinner = service.isLoading && <Spinner />
		const errorMessage = service.error && <ErrorMessage />
		const content = !(service.isLoading || service.error) && comicOrChar && (
			<WrappedComponent {...(hokProps as T)} item={comicOrChar} />
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
