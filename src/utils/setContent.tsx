import { Skeleton } from '../components/skeleton'
import { Spinner } from '../components/spinner'
import { ErrorMessage } from '../components/errorMessage'
import React from 'react'
import { ProcessEnum } from '../hooks/useProcess/useProcess.interface'

function setContent(
	process: ProcessEnum,
	Component: (props: { data: any }) => JSX.Element,
	data?: any
) {
	switch (process) {
		case ProcessEnum.WAITING:
			return <Skeleton />
		case ProcessEnum.LOADING:
			return <Spinner />
		case ProcessEnum.CONFIRMED:
			return <Component data={data} />
		case ProcessEnum.ERROR:
			return <ErrorMessage />
		default:
			throw new Error('Unexpected process state')
	}
}

export default setContent
