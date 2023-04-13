import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    reqSuccess: '',
    reqError: '',
    preloader: false
}

export const fetchUsers = createAsyncThunk(
    'fetchUsers',
    async function (users, {dispatch, rejectWithValue}) {
        try {
            dispatch(preloaderOn())
            dispatch(clearReqMsg())
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'GET',
                headers: {'Content-Type': 'text/plain'},
            })

            if (response.status >= 200 && response.status <= 204) {
                const data = await response.json()
                dispatch(getUsersRd(data))
                dispatch(successRd(response.status))
            } else {
                throw Error(response.status)
            }

        } catch (error) {
            dispatch(errorRd(error.message))
        }

        finally {
            dispatch(preloaderOff())

            setTimeout(() => {
                dispatch(clearReqMsg())
            }, 2500)
        }
    }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        getUsersRd: (state, action) => {
            state.users = action.payload
        },
        successRd: (state, action) => {
            state.reqError = ''
            state.reqSuccess = action.payload
        },
        errorRd: (state, action) => {
            state.reqError = action.payload
            state.reqSuccess = ''
        },
        preloaderOn: (state) => {
            state.preloader = true
        },
        preloaderOff: (state) => {
            state.preloader = false
        },
        clearReqMsg: (state) => {
            state.reqError = ''
            state.reqSuccess = ''
        }
    },
})

export const {getUsersRd, successRd, errorRd, preloaderOn, preloaderOff, clearReqMsg} = usersSlice.actions
export default usersSlice.reducer