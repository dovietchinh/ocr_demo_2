
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '~/Pages/Login';
import Logout from '~/Pages/Logout';
import Training from '~/Pages/Training';
import ProtectedRoute from "~/auth/ProtectedRoute"
import App from '~/App'
import ModelManagement from '~/Pages/ModelManagement';
import Testing from '~/Pages/Testing';
import TrainingProvider from '~/Pages/Training/hook';
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
                    element: (<TrainingProvider><Training/></TrainingProvider>)
                },
                {
                    path: "/models-management",
                    element: <ModelManagement/>
                },
                {
                    path: "/testing",
                    element: <Testing></Testing>
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