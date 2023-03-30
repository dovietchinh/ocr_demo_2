import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = ({ children }) => {
    const {token:getToken} = useAuth()
    const token = getToken()
    const location = useLocation()
    if(!token){
        return (
            <Navigate to="/app/fast_ocr/login" replace state={{from: location}}></Navigate>
        )
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};


export default ProtectedRoute