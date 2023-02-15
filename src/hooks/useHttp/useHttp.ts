import { useCallback } from 'react'
import { IRequestData, IUseHttpReturn } from './useHttp.interface'
import useProcess from '../useProcess/useProcess'
import { ProcessEnum } from '../useProcess/useProcess.interface'

const useHttp = (): IUseHttpReturn => {
	const [process, setProcess] = useProcess(ProcessEnum.WAITING)

	const request = useCallback(
		async ({
			url,
			headers = { 'Content-Type': 'application/json' },
			method = 'GET',
			body
		}: IRequestData) => {
			setProcess(ProcessEnum.LOADING)

			try {
				const response = await fetch(url, { headers, method, body })

				if (!response.ok) {
					throw new Error(
						`Something went wrong for ${url}, status: ${response.statusText}`
					)
				}

				const data = await response.json()

				return data
			} catch (err: any) {
				setProcess(ProcessEnum.ERROR)
				throw err
			}
		},
		[]
	)

	const clearError = useCallback(() => {
		setProcess(ProcessEnum.LOADING)
	}, [])

	return {
		request,
		clearError,
		process,
		setProcess
	}
}

export default useHttp
