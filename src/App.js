import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import { privateRoutes,publicRoutes } from './routes/router';
import DefaultLayout from './layouts/DefaultLayout';
import React, { Fragment } from 'react';
import NotFound from './pages/NotFound';
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

=======
import {ToastContainer} from "react-toastify";
>>>>>>> Login-DatCT

function App() {
  return (
   <>
   <BrowserRouter>
          <Routes>
            {
              publicRoutes.map((route,index) => {
                const Layout = route.layuot === null ? Fragment : DefaultLayout;
                const Page = route.component;
                 return <Route
                 key={index}
                 path={route.path}
                 element = {
                  <Layout>
                      <Page/>
                  </Layout>
                 }
                 />
              })
            }

            {
              privateRoutes.map((route,index) => {
                const Layout = route.layuot === null ? Fragment : DefaultLayout;
                const id = route.id === ':id' ? route.id : '';
                const Page = route.component;
                 return  <Route
                 key={index}
                 path={route.path+id}
                 element = {
                  <Layout>
                     <Page/>
                  </Layout>
                 }
                 />
              })
            }

<<<<<<< HEAD
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
   </BrowserRouter>
       <ToastContainer />
=======
            <Route path='*' element = {<NotFound/>}/>

          </Routes>
        </BrowserRouter>

        <ToastContainer/>

>>>>>>> Login-DatCT
   </>
  );
}

export default App;
