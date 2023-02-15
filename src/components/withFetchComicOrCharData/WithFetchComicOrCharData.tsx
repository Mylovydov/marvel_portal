import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import { ICharacter, IComic } from '../../interfaces/character.interface'
import IFetchFnType from './withFetchComicOrCharData.interface'
import setContent from '../../utils/setContent'
import { ProcessEnum } from '../../hooks/useProcess/useProcess.interface'

function WithFetchComicOrCharData<T>(
	WrappedComponent: React.ComponentType<T>,
	paramsName: string,
	fetchFn: IFetchFnType
) {
	return function WithFetchComicOrCharData(hokProps: Omit<T, `item`>) {
		const params = useParams()
		const comicOrCharId = params[paramsName]

		const { clearError, process, setProcess, ...rest } = useMarvelService()
		const [comicOrChar, setComicOrChar] = useState<IComic | ICharacter | null>(
			null
		)

		const onComicLoaded = (comicOrChar: IComic | ICharacter | null) => {
			if (comicOrChar) {
				setComicOrChar(comicOrChar)
			}
		}

		const loadComic = () => {
			clearError()
			if (comicOrCharId) {
				rest[fetchFn](comicOrCharId)
					.then(onComicLoaded)
					.then(() => setProcess(ProcessEnum.CONFIRMED))
			}
		}

		useEffect(() => {
			loadComic()
		}, [comicOrCharId])

		return (
			<>
				{setContent(process, () => (
					<WrappedComponent {...(hokProps as T)} item={comicOrChar} />
				))}
			</>
		)
	}
}

export default WithFetchComicOrCharData
