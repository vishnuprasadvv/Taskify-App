import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAdminState {
    admin: {
        _id: string,
        email: string, 
        name: string,
        role: string
    } | null,
    isAdminAuthenticated: boolean
}

const initialState : IAdminState = {
    isAdminAuthenticated : false,
    admin: null
}

const adminSlice = createSlice ({
    name: 'admin',
    initialState,
    reducers: {
        adminLoggedIn(state, action: PayloadAction<{admin:{_id: string, email: string, name: string, role: string}}>){
            state.admin = action.payload.admin;
            state.isAdminAuthenticated = true;
        },
        adminLogout(state) {
            state.admin = null;
            state.isAdminAuthenticated = false;
        }
    }
})

export default adminSlice.reducer;

export const {adminLoggedIn, adminLogout} = adminSlice.actions;