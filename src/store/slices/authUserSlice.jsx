import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "authUser",
    initialState: null,
    reducers: {
        setAuthUser: (state, action) => {
            return action.payload;
        },
        removeAuthUser: () => {
            return null;
        }
    },
});

export const { setAuthUser, removeAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;