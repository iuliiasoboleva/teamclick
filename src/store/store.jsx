import { configureStore } from "@reduxjs/toolkit";
// import selectedImageReducer from "./selectedImageSlice";

export const store = configureStore({
    reducer: {
        // selectedImage: selectedImageReducer,
    },
});
