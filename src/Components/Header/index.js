import classNames from "classnames/bind"
import { useState } from "react"
import Button from '~/Components/Button'
import SelectLanguage from './selectLanguage'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import style from './Header.module.scss'
let cx = classNames.bind(style)

const Header = () => {
	const intl = useIntl()
	const dispatch = useDispatch()
	const language = useSelector(state=>state.appSlice.language)
	const navigate = useNavigate();
	let location = useLocation();
	return (
		<>
		<div className={cx("button-group")}>
			<Button 
				variant={location.pathname!='/app/fast_ocr/training' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/app/fast_ocr/training')}
				checked={location.pathname=='/app/fast_ocr/training'}
			>
				{intl.formatMessage({id:"training"})}
			</Button>
			<Button 
				variant={location.pathname!='/app/fast_ocr/models-management' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/app/fast_ocr/models-management')}
				checked={location.pathname=='/app/fast_ocr/models-management'}
			>
				{intl.formatMessage({id:"models-management"})}
			</Button>
			<Button 
				variant={location.pathname!='/app/fast_ocr/testing' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/app/fast_ocr/testing')}
				checked={location.pathname=='/app/fast_ocr/testing'}
			>
				{intl.formatMessage({id:"testing"})}
			</Button>
		</div>
		<div className={cx("navbar-helper")}>
			<SelectLanguage></SelectLanguage>
		</div>
		<div className={cx("user-button")}>
			<Button variant="primary" onClick={(e)=>navigate('/app/fast_ocr/logout')}>{intl.formatMessage({id:"logout"})}</Button>
		</div>
		
		</>

	)
}

export default Header