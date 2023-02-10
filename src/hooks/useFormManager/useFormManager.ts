import IUseFormManagerProps, {
	handleBlurType,
	handleChangeType,
	HandleSubmitType,
	IUseFormManagerResult
} from './useFormManager.interface'
import { useEffect, useState } from 'react'
import { IFormManagerValues } from '../../components/formManager/formManager.interface'

const useFormManager = <
	Values extends IFormManagerValues = IFormManagerValues
>({
	onSubmit,
	validate,
	initialValues
}: IUseFormManagerProps<Values>): IUseFormManagerResult<Values> => {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [touched, setTouched] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const validateFields = () => {
		setErrors(validate(values))
	}

	useEffect(() => {
		validateFields()
	}, [values])

	const handleSetTouched = (fieldName: string) => {
		setTouched(prevState => ({
			...prevState,
			[fieldName]: true
		}))
	}

	const handleBlur: handleBlurType = e => {
		handleSetTouched(e.target.name)
	}

	const handleChange: handleChangeType = e => {
		const target = e.target
		const fieldName = target.name
		const fieldValue = target.value
		setValues(prevState => ({
			...prevState,
			[fieldName]: fieldValue
		}))
	}

	const setAllFieldIsTouched = () => {
		Object.keys(values).forEach(key => handleSetTouched(key))
	}

	const resetForm = () => {
		setValues(initialValues)
		setTouched({})
		setErrors({})
	}

	const handleSubmit: HandleSubmitType = e => {
		if (!e) {
			return
		}

		e.preventDefault()
		validateFields()
		setAllFieldIsTouched()
		if (onSubmit && !Object.entries(errors).length) {
			setIsSubmitting(true)
			onSubmit(values, { setIsSubmitting, resetForm })
		}
	}

	const getFieldProps = (fieldName: string) => {
		return {
			value: values[fieldName],
			onChange: handleChange,
			onBlur: handleBlur,
			name: fieldName
		}
	}

	return {
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldProps,
		values,
		errors,
		touched,
		isSubmitting
	}
}

export default useFormManager
