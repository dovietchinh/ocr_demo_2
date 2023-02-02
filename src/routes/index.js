
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '~/Pages/Login';
import Logout from '~/Pages/Logout';
import Training from '~/Pages/Training';
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
                    element: <Training/>
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