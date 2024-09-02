import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './features/Search/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  }
})