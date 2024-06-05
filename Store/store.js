import { configureStore } from '@reduxjs/toolkit'
import { UserReducer  } from '@/Utils/UserSlice'
import { JobReducer } from '@/Utils/ServiceSlice'
import { AppliedJobReducer } from '@/Utils/RequestsSlice'

export const store = configureStore({
  reducer: {
    User: UserReducer, 
    Job : JobReducer, 
    AppliedJob : AppliedJobReducer,

  },
})