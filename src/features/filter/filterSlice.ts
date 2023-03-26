import { createSlice } from '@reduxjs/toolkit'
import { TFilterState } from '../../types/types'

export const initialFilterState: TFilterState = {
  page: 1,
  direction: 'ascending',
  sortField: 'albumName',
  query: null
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    resetFilter: () => initialFilterState,
    setFilter: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { resetFilter, setFilter } = filterSlice.actions
export default filterSlice.reducer
