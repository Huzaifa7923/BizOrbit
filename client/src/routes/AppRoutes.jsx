import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { LoginForm } from '../pages/LoginForm.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import MyProfile from '../pages/MyProfile.jsx'
import AdminRoute from './AdminRoute.jsx'
import UsersList from '../pages/UsersList.jsx'
import SignUpForm from '../pages/SignUpForm.jsx'
import Taskbar from '../components/Taskbar.jsx'
import EditProfile from '../pages/EditProfile.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Taskbar/>
        <Routes>
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path='' element={<PrivateRoute/>} >
          <Route path='/profile' element={<MyProfile/>} />
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='' element={<AdminRoute/>} >
            <Route path='/users' element={<UsersList/>} />
            <Route path='/editUser/:id' element={<EditProfile/>}/>
          </Route>
          </Route>
          </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes