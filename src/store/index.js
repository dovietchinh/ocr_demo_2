import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit"
import thunk from 'redux-thunk';
const initialState = {
    'language': 'en',
}

export const appSlice = createSlice({
    'name': "appSlice",
    'initialState': initialState,
    'reducers': {
        setLanguage(state,action){   // action creator
            state.language = action.payload
        }
    }
})

const reducers = combineReducers({
    appSlice: appSlice.reducer
})

const store = configureStore({
    'reducer':reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
})

export default store