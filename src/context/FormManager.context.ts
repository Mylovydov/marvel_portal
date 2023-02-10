import { createContext } from 'react'
import useFormManager from '../hooks/useFormManager/useFormManager'

const FormManagerContext = createContext<null | ReturnType<
	typeof useFormManager
>>(null)

export default FormManagerContext
