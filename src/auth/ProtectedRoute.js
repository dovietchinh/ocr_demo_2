import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = "token"
    const location = useLocation()
    if(!token){
        return (
            <Navigate to="/" replace state={{from: location}}></Navigate>
        )
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};


export default ProtectedRoute