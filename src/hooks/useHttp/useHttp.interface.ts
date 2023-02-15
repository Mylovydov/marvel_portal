import React from 'react'
import { ProcessEnum } from '../useProcess/useProcess.interface'

export interface IRequestData {
	url: string
	method?: RequestInit['method']
	headers?: RequestInit['headers']
	body?: RequestInit['body']
}

export interface IUseHttpReturn {
	process: ProcessEnum
	clearError: () => void
	request: (data: IRequestData) => Promise<any> | Error
	setProcess: React.Dispatch<React.SetStateAction<ProcessEnum>>
}
