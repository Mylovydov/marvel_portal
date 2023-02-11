import './randomChar.scss'
import { useCallback, useState } from 'react'
import Banner from '../banner/Banner'
import Character from '../character/Character'

const getRandomId = () => {
	return Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
}

const RandomChar = () => {
	const [charId, setCharId] = useState(getRandomId)

	const setNewCharId = useCallback(() => {
		const id = getRandomId()
		setCharId(id)
	}, [])

	return (
		<div className="randomchar">
			<div className="randomchar__block">
				<Character id={charId} />
			</div>
			<div className="randomchar__static">
				<Banner
					title="Random character for today!"
					subtitleOne="Do you want to get to know him better?"
					subtitleTwo="Or choose another one"
					btnText="try it"
					action={setNewCharId}
				/>
			</div>
		</div>
	)
}

export default RandomChar
