import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { LoginForm } from '../pages/LoginForm.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import MyProfile from '../pages/MyProfile.jsx'
import AdminRoute from './AdminRoute.jsx'
import UsersList from '../pages/UsersList.jsx'
import SignUpForm from '../pages/SignUpForm.jsx'
import Taskbar from '../components/Taskbar.jsx'
import EditProfile from '../pages/edits/EditProfile.jsx'
import BusinessDetails from '../pages/BusinessDetails.jsx'
import DocumentDetails from '../pages/DocumentDetails.jsx'
import KycDetails from '../pages/KycDetails.jsx'
import AllBusinessDetails from '../pages/AllBusinessDetails.jsx'

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
          <Route path='/myBusiness' element={<BusinessDetails/>}/>
          <Route path='/allBusiness' element={<AllBusinessDetails/>}/>
          <Route path='/kycDetails' element={<KycDetails/>}/>
          <Route path='/documentDetails' element={<DocumentDetails/>}/>

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