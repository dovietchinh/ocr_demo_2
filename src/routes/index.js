
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '~/Pages/Login';
import ProtectedRoute from "~/auth/ProtectedRoute"
import App from '~/App'
const OCRRouter = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login/>,
        },
        { 
            path: "/", 
            element: (
                <ProtectedRoute>
                    <App></App>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/training",
                    element: <div>training</div>
                },
                {
                    path: "/model-management",
                    element: <div>model-management</div>
                },
                {
                    path: "/testing",
                    element: <div>testing</div>
                }
            ]
        },
        { 
            path: "/logout",
            element: <Navigate to="/login" replace={true}></Navigate>
        }
    ]
)

export default OCRRouter