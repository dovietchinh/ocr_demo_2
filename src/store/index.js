import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit"
import thunk from 'redux-thunk';
const initialState = {
    'language': 'en',
    'user':{
        'name': 'chinhdv',
        'avatar': '',
        'email': '',
    },
    'data': {
        'models': [],
        'selectedModel': null,
        'selectedModelID': null,
    }
}

export const appSlice = createSlice({
    'name': "appSlice",
    'initialState': initialState,
    'reducers': {
        setLanguage(state,action){   // action creator
            state.language = action.payload
        },
        resetState(state,action){
            state = initialState
        },
        setModels(state,action){
            state.data.models = action.payload
        },
        deleteModels(state,action){
            if(action.payload){
                state.data.models.splice(action.payload,1)
            }
            else{
                state.data.models.splice(-1,1)
            }
        },
        addModels(state,action){
            state.data.models.push(action.payload)
        },
        setUser(state,action){
            state.user = action.payload
        },
        setSelectedModel(state,action){
            state.data.selectedModel = action.payload
        },
        setSelectedModelID(state,action){
            state.data.selectedModelID = action.payload
        },
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