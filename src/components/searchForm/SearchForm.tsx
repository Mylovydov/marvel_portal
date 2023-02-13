import React, { useState } from 'react'
import './searchForm.scss'
import { ICharacter } from '../../interfaces/character.interface'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import useMarvelServiceForQuery from '../../services/marvelServiceForQuery/marvelServiceForQuery'
import { ErrorMessage } from '../errorMessage'

type InitialValuesType = {
	name: string
}

const initialFormValues: InitialValuesType = { name: '' }

const SearchForm = () => {
	const { findCharacter } = useMarvelServiceForQuery()
	const [char, setChar] = useState<ICharacter | null>(null)
	const [isSearchOver, setIsSearchOver] = useState(false)

	const { mutate, isError, isLoading } = useMutation(findCharacter)

	const navigate = useNavigate()

	const renderResultBlock = () => {
		const successMessage = !isLoading && isSearchOver && char && (
			<>
				<div className="success">{`There is! Visit ${char.name} page?`}</div>
				<button
					onClick={() => navigate(`/character/${char.id}`)}
					className="button button__secondary"
				>
					<div className="inner">TO PAGE</div>
				</button>
			</>
		)

		const notFoundMessage = !isLoading && isSearchOver && !char && (
			<div className="not-found">
				{'The character was not found. Check the name and try again'}
			</div>
		)

		return (
			isSearchOver && (
				<div className="search__results">
					{successMessage}
					{notFoundMessage}
				</div>
			)
		)
	}

	return (
		<>
			{isError ? (
				<ErrorMessage />
			) : (
				<div className={'search-form'}>
					<Formik
						initialValues={initialFormValues}
						validationSchema={Yup.object({
							name: Yup.string().required('This field is required')
						})}
						onSubmit={(values, { setSubmitting }) => {
							if (values.name) {
								mutate(values.name, {
									onSuccess: char => {
										setChar(char)
									},
									onSettled: () => {
										setSubmitting(false)
										setIsSearchOver(true)
									}
								})
							}
						}}
					>
						{({
							errors,
							touched,
							isSubmitting,
							getFieldProps,
							handleSubmit
						}) => (
							<form className="form" onSubmit={handleSubmit}>
								<div className="form_head">
									<h5 className="input_label">Or find a character by name</h5>
								</div>
								<div className="form__item">
									<div className="search">
										<div className="search__actions">
											<div className="actions__input">
												<input
													className="search_input"
													placeholder="Enter name"
													onFocus={() => setIsSearchOver(false)}
													type="text"
													{...getFieldProps('name')}
												/>
												{errors.name && touched.name && (
													<div className="error">{errors.name}</div>
												)}
											</div>
											<div className="actions__btn">
												<button
													disabled={isSubmitting}
													className="button button__main"
													type={'submit'}
												>
													<div className="inner">FIND</div>
												</button>
											</div>
										</div>
										{renderResultBlock()}
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			)}
		</>
	)
}

export default SearchForm
