import { useCallback, useState } from 'react'
import { IRequestData } from './useHttp.interface'

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const request = useCallback(
		async ({
			url,
			headers = { 'Content-Type': 'application/json' },
			method = 'GET',
			body
		}: IRequestData) => {
			try {
				setIsLoading(true)
				const response = await fetch(url, { headers, method, body })

				if (!response.ok) {
					throw new Error(`Something went wrong for ${url}, status: ${response.statusText}`)
				}

				const data = await response.json()
				setIsLoading(false)
				return data
			} catch (err: any) {
				setError(err.message)
				throw err
			} finally {
				setIsLoading(false)
			}
		},
		[]
	)

	const clearError = useCallback(() => setError(null), [])

	return {
		isLoading,
		error,
		request,
		clearError
	}
}

export default useHttp
