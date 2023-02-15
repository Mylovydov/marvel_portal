import { useState } from 'react'
import IUseProcessReturnType, {
	IUseProcessPropsType,
	ProcessEnum
} from './useProcess.interface'

const useProcess = (
	initialProcess: IUseProcessPropsType
): IUseProcessReturnType => {
	const [process, setProcess] = useState<ProcessEnum>(initialProcess)

	return [process, setProcess]
}

export default useProcess
