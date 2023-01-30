import { IntlProvider } from "react-intl"
import { useSelector } from "react-redux"
import AuthProvider from "./auth/AuthProvider"
import listLanguage from "./assets/i18n"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Navigate, useRoutes, RouterProvider} from "react-router-dom"

import Login from "~/Pages/Login"
import OCRRouter from "./routes"
import { ToastProvider } from "./Components/Toast"
const queryClient = new QueryClient()
const AppRoutes = () => {
    const language = useSelector(state=>state.appSlice.language)
    return (
        <IntlProvider messages={listLanguage[language]} locale={language} defaultLocale={language}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ToastProvider>
                        <RouterProvider router={OCRRouter} />
                    </ToastProvider>
                </AuthProvider>
            </QueryClientProvider>
        </IntlProvider>
    )
}

export default AppRoutes