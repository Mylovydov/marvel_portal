import { Dispatch, SetStateAction } from 'react'

export enum ProcessEnum {
	WAITING = 'waiting',
	LOADING = 'loading',
	CONFIRMED = 'confirmed',
	ERROR = 'error'
}

export type IUseProcessPropsType = ProcessEnum

type IUseProcessReturnType = [
	process: ProcessEnum,
	setProcess: Dispatch<SetStateAction<ProcessEnum>>
]

export default IUseProcessReturnType
