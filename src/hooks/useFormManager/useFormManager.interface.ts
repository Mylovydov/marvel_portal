import {
	OnSubmitType,
	ValidateType
} from '../../components/formManager/formManager.interface'
import React from 'react'

export type HandleSubmitType = {
	(e?: React.FormEvent<HTMLFormElement | undefined>): void
}

export type handleBlurType = {
	(e: React.FocusEvent<any>): void
}

export type handleChangeType = {
	(e: React.ChangeEvent<any>): void
}

interface IUseFormManagerProps<Values> {
	initialValues: Values
	validate: ValidateType<Values>
	onSubmit: OnSubmitType<Values>
}

export interface IUseFormManagerResult<Values> {
	values: Values
	touched: { [K in keyof Values]?: boolean }
	isSubmitting: boolean
	errors: { [K in keyof Values]?: string }
	handleSubmit: HandleSubmitType
	handleChange: handleChangeType
	handleBlur: handleBlurType
	getFieldProps: (fieldName: string) => {
		value: string | number | readonly string[] | undefined
		onChange: handleChangeType
		onBlur: handleBlurType
		name: string
	}
}

export default IUseFormManagerProps
