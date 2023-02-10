import './promotionBanner.scss'
import React from 'react'
import { IAppBannerProps } from './promotionBanner.interface'

const PromotionBanner = ({ startImg, endImg, text }: IAppBannerProps) => {
	return (
		<section className="promotion-banner">
			<div className="promotion-banner__img">
				<img src={startImg} alt="" />
			</div>
			<div className="promotion-banner__content">{text}</div>
			<div className="promotion-banner__logo">
				<img src={endImg} alt="" />
			</div>
		</section>
	)
}

export default PromotionBanner
