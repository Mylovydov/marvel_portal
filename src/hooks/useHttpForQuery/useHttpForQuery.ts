import { useCallback } from 'react'
import { IRequestData } from './useHttpForQuery.interface'

const useHttpForQuery = () => {
	return useCallback(
		async ({
			url,
			headers = { 'Content-Type': 'application/json' },
			method = 'GET',
			body
		}: IRequestData) => {
			const response = await fetch(url, { headers, method, body })

			if (!response.ok) {
				throw new Error(
					`Something went wrong for ${url}, status: ${response.statusText}`
				)
			}

			return await response.json()
		},
		[]
	)
}

export default useHttpForQuery
