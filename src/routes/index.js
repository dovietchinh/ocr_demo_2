
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '~/Pages/Login';
import Logout from '~/Pages/Logout';
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
                    path: "/models-management",
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
            element: <Logout></Logout>
        }
    ]
)

export default OCRRouter