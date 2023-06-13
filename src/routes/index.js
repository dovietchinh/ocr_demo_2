
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '~/Pages/Login';
import Logout from '~/Pages/Logout';
import Training from '~/Pages/Training';
import ProtectedRoute from "~/auth/ProtectedRoute"
import App from '~/App'
import ModelManagement from '~/Pages/ModelManagement';
import Testing from '~/Pages/Testing';
import TrainingProvider from '~/Pages/Training/hook';
import TestingProvider from '~/Pages/Testing/hook';
const OCRRouter = createBrowserRouter(
    [   
        {
            path: "/",
            element: (<Navigate to='/app/fast_ocr/login'></Navigate>),
        },
        {
            path: "/app/fast_ocr/login",
            element: <Login/>,
        },
        { 
            path: "/app/fast_ocr/", 
            element: (
                <ProtectedRoute>
                    <App></App>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/app/fast_ocr/training",
                    element: (<TrainingProvider><Training/></TrainingProvider>)
                },
                {
                    path: "/app/fast_ocr/models-management",
                    element: <ModelManagement/>
                },
                {
                    path: "/app/fast_ocr/testing",
                    element: <TestingProvider><Testing></Testing></TestingProvider>
                }
            ]
        },
        { 
            path: "/app/fast_ocr/logout",
            element: <Logout></Logout>
        }
    ]
)

export default OCRRouter