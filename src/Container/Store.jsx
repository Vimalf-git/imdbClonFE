import { configureStore } from "@reduxjs/toolkit";
import movieDataSlice from "./movieSlice";
export default configureStore({
    reducer:{
        userSlice:movieDataSlice
    }
})