import { createSlice } from "@reduxjs/toolkit";

const connectionReqsSlice = createSlice({
    name: "connectionReqs",
    initialState: [],
    reducers:{
        allConnectionReqs:(state,action)=>action.payload,
        removeConnectionReq:(state, action)=>{
            return state.filter((connectionReq)=> connectionReq._id != action.payload)
        }
    }
})

export const {allConnectionReqs, removeConnectionReq} = connectionReqsSlice.actions;
export default connectionReqsSlice.reducer;