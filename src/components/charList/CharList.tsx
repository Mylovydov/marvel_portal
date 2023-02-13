import './charList.scss'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { ICharListProps } from './charList.interface'
import { ICharacter } from '../../interfaces/character.interface'
import { ErrorMessage } from '../errorMessage'
import { Spinner } from '../spinner'
import useMarvelServiceForQuery from '../../services/marvelServiceForQuery/marvelServiceForQuery'
import { useQuery } from 'react-query'

const CharList = ({ onCharSelected }: ICharListProps) => {
	const { getAllCharacters } = useMarvelServiceForQuery()

	const [isInitialLoading, setIsInitialLoading] = useState(true)
	const [charList, setCharList] = useState<ICharacter[]>([])
	const [offset, setOffset] = useState(250)

	const { isLoading, isError, data } = useQuery(['charList', offset], () =>
		getAllCharacters(offset)
	)

	useEffect(() => {
		if (data) {
			setIsInitialLoading(false)
			setCharList(prevState => [...prevState, ...data])
		}
	}, [data])

	const onGetNextCharacters = () => {
		setOffset((offset: number) => offset + 9)
	}

	const charItemsRef = useRef<HTMLLIElement[]>([])

	const pushCharItemRef = (element: HTMLLIElement) => {
		if (element) {
			charItemsRef.current.push(element)
		}
	}

	const focusOnSelectChar = (id: number) => {
		const focusElem = charItemsRef.current[id]
		charItemsRef.current.forEach(elem =>
			elem.classList.remove('char__item_selected')
		)
		focusElem.classList.add('char__item_selected')
		focusElem.focus()
	}

	const renderCharacters = (chars: ICharacter[]) => {
		const items = chars.map((char, i) => {
			const imgStyle: CSSProperties = {
				objectFit: `${
					char.thumbnail.includes('image_not_available') ? 'fill' : 'cover'
				}`,
				maxWidth: 'initial'
			}

			return (
				<li
					ref={pushCharItemRef}
					tabIndex={0}
					className="char__item"
					key={char.id}
					onClick={() => {
						focusOnSelectChar(i)
						onCharSelected(char.id)
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
						if (e.code === 'Space' || e.code === 'Enter') {
							e.preventDefault()
							focusOnSelectChar(i)
							onCharSelected(char.id)
						}
					}}
				>
					<img src={char.thumbnail} alt="abyss" style={imgStyle} />
					<div className="char__name">{char.name}</div>
				</li>
			)
		})

		return <ul className="char__grid">{items}</ul>
	}

	const charItems = renderCharacters(charList)

	const errorMessage = isError && <ErrorMessage />
	const spinner = isInitialLoading && !data && !isError && <Spinner />
	const content = !(isInitialLoading || isError) && charItems

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
			<button
				disabled={isLoading}
				className="button button__main button__long"
				onClick={() => onGetNextCharacters()}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default CharList
