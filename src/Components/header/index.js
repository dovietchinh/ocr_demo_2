import { Container, Row, Col, Button } from "react-bootstrap"
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import Button from '~/Components/button'
const Header = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const language = useSelector(state=>state.appSlice.language)
    const navigate = useNavigate();
    return (
            <>
                    <Button onClick={(e)=>navigate('/training')}>{intl.formatMessage({id:"training"})}</Button>
                    <Button onClick={(e)=>navigate('/models-management')}>{intl.formatMessage({id:"models-management"})}</Button>
                    <Button onClick={(e)=>navigate('/testing')}>{intl.formatMessage({id:"testing"})}</Button>
                    <Button onClick={(e)=>navigate('/logout')}>{intl.formatMessage({id:"logout"})}</Button>
            </>
  
    )
}

export default Header