import { ProcessEnum } from '../hooks/useProcess/useProcess.interface'
import { Spinner } from '../components/spinner'
import { ErrorMessage } from '../components/errorMessage'
import React from 'react'

const setCharListContent = (
	process: ProcessEnum,
	Component: () => JSX.Element,
	isInitialLoading: boolean
) => {
	switch (process) {
		case ProcessEnum.WAITING:
			return <Spinner />
		case ProcessEnum.LOADING:
			return isInitialLoading ? <Spinner /> : <Component />
		case ProcessEnum.CONFIRMED:
			return <Component />
		case ProcessEnum.ERROR:
			return <ErrorMessage />
		default:
			throw new Error('Unexpected process state')
	}
}

export default setCharListContent
