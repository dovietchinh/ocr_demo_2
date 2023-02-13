import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = ({ children }) => {
    const {token:getToken} = useAuth()
    const token = getToken()
    // const token = "token"
    console.log("token: ",token)
    const location = useLocation()
    if(!token){
        return (
            <Navigate to="/login" replace state={{from: location}}></Navigate>
        )
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};


export default ProtectedRoute