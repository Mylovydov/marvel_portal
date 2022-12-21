import { ReactNode } from 'react'

export interface IErrorBoundaryState {
	isError: boolean
}

export interface IErrorBoundaryProps {
	children: ReactNode
}
