import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./slices/authUserSlice";
import connectionReqsReducer from './slices/connectionReqsSlice';
import allConnectionsListReducer from './slices/allConnectionsSlice';
import feedsReducer from './slices/feedSlice';

export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        connectionReqs: connectionReqsReducer,
        allConnectionsList: allConnectionsListReducer,
        feeds: feedsReducer
    },
});