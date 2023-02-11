import React from 'react'
import './banner.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import IBannerPropsType from './banner.interface'

const Banner = ({
	title,
	subtitleOne,
	subtitleTwo,
	btnText,
	action
}: IBannerPropsType) => {
	return (
		<div className="banner">
			<p className="banner__title">
				{title}
				<br />
				{subtitleOne}
			</p>
			<p className="banner__title">{subtitleTwo}</p>
			<button className="button button__main">
				<div className="inner" onClick={action}>
					{btnText}
				</div>
			</button>
			<img src={mjolnir} alt="mjolnir" className="banner__decoration" />
		</div>
	)
}

export default Banner
