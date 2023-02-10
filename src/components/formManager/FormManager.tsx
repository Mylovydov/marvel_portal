import { FormManagerProps, IFormManagerValues } from './formManager.interface'
import useFormManager from '../../hooks/useFormManager/useFormManager'
import FormManagerContext from '../../context/FormManager.context'

const FormManager = <
	Values extends IFormManagerValues = IFormManagerValues,
	ExtraProps = {}
>(
	props: FormManagerProps<Values> & ExtraProps
) => {
	const { initialValues, onSubmit, validate, children } = props

	const manager = useFormManager({ initialValues, validate, onSubmit })

	const contextValue = {
		...manager
	}
	const form = typeof children === `function` ? children(manager) : children

	return (
		<FormManagerContext.Provider value={contextValue}>
			{form}
		</FormManagerContext.Provider>
	)
}

export default FormManager
