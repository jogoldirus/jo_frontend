import './index.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Error404 from './Pages/Public/Error404.jsx';
import HeaderAndFooter from './Composants/Public/HeaderAndFooter.jsx';
import Login from './Pages/Public/Login.jsx';
import { AuthProvider } from './Providers/AuthContext.jsx';
import Home from './Pages/Public/Home.jsx';
import LoadingScreen from './Composants/Reusable/LoadingScreen.jsx';
import AdminBoard from './Pages/Admin/AdminBoard.jsx';
import AdminHome from './Pages/Admin/AdminHome.jsx';
const queryClient = new QueryClient()
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HeaderAndFooter />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        <Route path='*' element={<Error404 />} />
      </Route>
      {/* 
      <Route path='/dashboard' element={<ClientWrapper />}>
        <Route index element={<ClientHome />} />
        <Route path='/dashboard/makeanalyse' element={<AnalyseWrapper />} />
        <Route path='/dashboard/analyse' element={<ClientAnalyseArray />} />
        <Route path='*' element={<Error404 />} />
      </Route> */}

      <Route path='/admin-dashboard' element={<AdminBoard />}>
        <Route index element={<AdminHome />} />
        {/* <Route path='/dashboard/arbitrage' element={<DBArbitrage />} /> */}
        <Route path='*' element={<Error404 />} />
      </Route>
      <Route path='*' element={<Error404 />} />
    </>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </QueryClientProvider>
)
