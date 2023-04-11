import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from 'app/store'

export interface User {
  id: string
  name: string
}

const INITIAL_STATE: User[] = [
  { id: '0', name: 'Dude Lebowski' },
  { id: '1', name: 'Neil Young' },
  { id: '2', name: 'Dave Gray' }
]

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {}
})

export const selectAllUsers = (store: RootState) => store.users

export default usersSlice
