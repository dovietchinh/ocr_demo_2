import { createContext, useContext, useState } from  "react";
import PropTypes from 'prop-types'
import { loginApi, refreshTokenApi } from "~/services/userServices";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/utils/constants";
import { useDispatch } from "react-redux";
import { appSlice } from '~/store'
const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const dispatch = useDispatch()
    // const []
    const signIn = async (data) => {
    // call api
        // try {
            const res = await loginApi(data)

            if (res && res?.access_token) {
                setToken(res?.access_token);
                localStorage.setItem(ACCESS_TOKEN, res?.access_token);
                localStorage.setItem(REFRESH_TOKEN, res?.refresh_token);
            }
            if(res?.user){
                dispatch(appSlice.actions.setUser(res?.user))
            }

            return res;
        // } catch (error) {
        //     console.log('error: ',error)
        //     return error?.response;
            
        // }
    };
    const getNewAccessToken = async () => {
        const res = await refreshTokenApi();
        if (res && res?.access) {
            setToken(res?.access);
            localStorage.setItem(ACCESS_TOKEN, res?.access);
            localStorage.setItem(REFRESH_TOKEN, res?.refresh);
        }
    };
    const signOut = async (callback) => {
        // call api
        setToken();
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        // localStorage.removeItem(OTT_WARNING);
        if (callback) {
            callback();
        }
    };
    const value = { token: localStorage.getItem(ACCESS_TOKEN), signIn, signOut, getNewAccessToken };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

AuthProvider.propTypes = {
    'children': PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider