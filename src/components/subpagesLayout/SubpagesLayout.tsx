import React from 'react'
import { PromotionBanner } from '../promotionBanner'
import avengers from '../../resources/img/Avengers.png'
import logo from '../../resources/img/Avengers_logo.png'
import { Outlet } from 'react-router-dom'

const SubpagesLayout = () => {
	return (
		<>
			<PromotionBanner
				startImg={avengers}
				endImg={logo}
				text="New comics every week! Stay tuned!"
			/>
			<Outlet />
		</>
	)
}

export default SubpagesLayout
