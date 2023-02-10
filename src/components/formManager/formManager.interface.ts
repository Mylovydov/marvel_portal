import { ReactNode } from 'react'
import { IUseFormManagerResult } from '../../hooks/useFormManager/useFormManager.interface'

export interface IFormManagerValues {
	[key: string]: any
}

export type OnSubmitType<Values> = {
	(values: Values, managerHelpers: IFormManagerHelpers): void
}

export type ValidateType<Values> = {
	(values: Values): { [K in keyof Values]?: string }
}

export interface IFormManagerHelpers {
	setIsSubmitting: (isSubmitting: boolean) => void
	resetForm: () => void
}

export interface FormManagerProps<Values> {
	initialValues: Values
	onSubmit: OnSubmitType<Values>
	validate: ValidateType<Values>
	children: ((props: IUseFormManagerResult<Values>) => ReactNode) | ReactNode
}
