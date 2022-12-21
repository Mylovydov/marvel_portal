import './charList.scss'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { ICharListProps } from './charList.interface'
import { ICharacter } from '../../interfaces/character.interface'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

const CharList = (props: ICharListProps) => {
	const { isLoading, error, getAllCharacters } = useMarvelService()

	const [charList, setCharList] = useState<ICharacter[]>([])
	const [isInitialLoading, setIsInitialLoading] = useState(true)
	const [offset, setOffset] = useState(210)

	const { onCharSelected } = props

	useEffect(() => {
		onRequest()
	}, [])

	const onRequest = (offset?: number) => {
		getAllCharacters(offset).then(onCharactersLoaded)
	}

	const onCharactersLoaded = (newCharList: ICharacter[]) => {
		setCharList((charList: ICharacter[]) => [...charList, ...newCharList])
		setIsInitialLoading(false)
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
		charItemsRef.current.forEach(elem => elem.classList.remove('char__item_selected'))
		focusElem.classList.add('char__item_selected')
		focusElem.focus()
	}

	const renderCharacters = (chars: ICharacter[]) => {
		const items = chars.map((char, i) => {
			const imgStyle: CSSProperties = {
				objectFit: `${char.thumbnail.includes('image_not_available') ? 'fill' : 'cover'}`
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

	const errorMessage = error && <ErrorMessage />
	const spinner = isLoading && <Spinner />
	const content = !(isInitialLoading || error) && charItems

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
			<button
				disabled={isLoading}
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default CharList
