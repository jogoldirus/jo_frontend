import './index.css'
import { Suspense } from 'react'
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
import Offers from './Pages/Public/Offers.jsx';
import { BasketProvider } from './Providers/BasketContext.jsx';
import Basket from './Pages/Public/Basket.jsx';
import ClientHome from './Pages/Client/ClientHome.jsx';
import PdfTicketTemplate from './Composants/Client/PdfTicketTemplate.jsx';
import AdminEvents from './Pages/Admin/AdminEvents.jsx';
import AdminOffers from './Pages/Admin/AdminOffers.jsx';
import Register from './Pages/Public/Register.jsx';
import TicketVerification from './Pages/Public/TicketVerification.jsx';
const queryClient = new QueryClient()
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/pdfview' element={<div className='flex flex-row justify-center z-50 bg-slate-700 py-2'><PdfTicketTemplate /></div>} />
      <Route path='/ticketverification/:completeKey' element={<TicketVerification />} />
      <Route path='/' element={<HeaderAndFooter />}>
        <Route index element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/basket' element={<Basket />} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        <Route path='*' element={<Error404 />} />
      </Route>
      <Route path='/dashboard' element={<HeaderAndFooter />}>
        <Route index element={<ClientHome />} />
        <Route path='*' element={<Error404 />} />
      </Route> *

      <Route path='/admin-dashboard' element={<AdminBoard />}>
        <Route index element={<AdminHome />} />
        <Route path='/admin-dashboard/events' element={<AdminEvents />} />
        <Route path='/admin-dashboard/offers' element={<AdminOffers />} />
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
        <BasketProvider>
          <RouterProvider router={router} />
        </BasketProvider>
      </AuthProvider>
    </Suspense>
  </QueryClientProvider>
)
