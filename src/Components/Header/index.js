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
				variant={location.pathname!='/training' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/training')}
				checked={location.pathname=='/training'}
			>
				{intl.formatMessage({id:"training"})}
			</Button>
			<Button 
				variant={location.pathname!='/models-management' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/models-management')}
				checked={location.pathname=='/models-management'}
			>
				{intl.formatMessage({id:"models-management"})}
			</Button>
			<Button 
				variant={location.pathname!='/testing' ? "primary" : "primary-reverse"}
				onClick={(e)=>navigate('/testing')}
				checked={location.pathname=='/testing'}
			>
				{intl.formatMessage({id:"testing"})}
			</Button>
		</div>
		<div className={cx("navbar-helper")}>
			<SelectLanguage></SelectLanguage>
		</div>
		<div className={cx("user-button")}>
			<Button variant="primary" onClick={(e)=>navigate('/logout')}>{intl.formatMessage({id:"logout"})}</Button>
		</div>
		
		</>

	)
}

export default Header