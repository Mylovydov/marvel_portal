import React from 'react'
import { ProcessEnum } from '../hooks/useProcess/useProcess.interface'
import { Spinner } from '../components/spinner'
import { ErrorMessage } from '../components/errorMessage'
import { IComic } from '../interfaces/character.interface'
import { IComicsListProps } from '../components/comicsList'

const setComicsListContent = (
	process: ProcessEnum,
	Component: (props: IComicsListProps) => JSX.Element,
	isInitialLoading: boolean,
	data: IComic[]
) => {
	switch (process) {
		case ProcessEnum.WAITING:
			return <Spinner />
		case ProcessEnum.LOADING:
			return isInitialLoading ? <Spinner /> : <Component data={data} />
		case ProcessEnum.CONFIRMED:
			return <Component data={data} />
		case ProcessEnum.ERROR:
			return <ErrorMessage />
		default:
			throw new Error('Unexpected process state')
	}
}

export default setComicsListContent
