import { createSlice } from "@reduxjs/toolkit";

const allConnectionsListSlice = createSlice({
    name:"allConnectionsList",
    initialState: [],
    reducers:{
        setAllConnectionList:(state, action)=>action.payload,
    }
})

export const {setAllConnectionList} = allConnectionsListSlice.actions;
export default allConnectionsListSlice.reducer;