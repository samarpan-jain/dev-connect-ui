import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice(
    {
        name:"feeds",
        initialState:[],
        reducers:{
            setFeeds:(state, action)=> action.payload,
            removeFeed:(state, action)=> {
                return state.slice(1)
            }
        }
    }
)

export const {setFeeds, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;