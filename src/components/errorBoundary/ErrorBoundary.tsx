import { Component, ErrorInfo } from 'react'
import { ErrorMessage } from '../errorMessage'
import { IErrorBoundaryProps, IErrorBoundaryState } from './errorBoundary.interface'

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
	state: IErrorBoundaryState = {
		isError: false
	}

	// static getDerivedStateFromError(error: Error) {
	// 	return { isError: true }
	// }

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			isError: true
		})
	}

	render() {
		if (this.state.isError) {
			return <ErrorMessage />
		}

		return this.props.children
	}
}

export default ErrorBoundary
