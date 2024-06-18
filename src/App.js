<<<<<<< HEAD

<<<<<<< HEAD
import {BrowserRouter, Routes, Route} from 'react-router-dom'
=======
=======
>>>>>>> List/CreateContract-HoaiNT
import {BrowserRouter,Routes,Route} from 'react-router-dom'
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
import './App.css';
import {privateRoutes, publicRoutes} from './routes/router';
import DefaultLayout from './layouts/DefaultLayout';
<<<<<<< HEAD
import {Fragment} from 'react';
import NotFound from './pages/NotFound';
import {ToastContainer} from "react-toastify";
=======
import React, { Fragment } from 'react';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AdminProvider} from "./services/Authenticate/AdminContext";
>>>>>>> List/CreateContract-HoaiNT


function App() {
<<<<<<< HEAD
    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    {
                        publicRoutes.map((route, index) => {
                            const Layout = route.layuot === null ? Fragment : DefaultLayout;
                            const Page = route.component;
                            return <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            />
                        })
                    }

                    {
                        privateRoutes.map((route, index) => {
                            const Layout = route.layuot === null ? Fragment : DefaultLayout;
                            const id = route.id === ':id' ? route.id : '';
                            const Page = route.component;
                            return <Route
                                key={index}
                                path={route.path + id}
                                element={
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            />
                        })
                    }

                    <Route path='*' element={<NotFound/>}/>


                </Routes>
            </BrowserRouter>
        </>
    );
=======
  return (
   <>
<<<<<<< HEAD
       <ToastContainer/>
        <BrowserRouter>
=======
       <AdminProvider>
       <BrowserRouter>
>>>>>>> List/CreateContract-HoaiNT
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

            <Route path='*' element = {<NotFound/>}/>
<<<<<<< HEAD
          </Routes>
       </BrowserRouter>
=======


      </Routes>
   </BrowserRouter>
   <ToastContainer/>
        </AdminProvider>

>>>>>>> List/CreateContract-HoaiNT
   </>
  );
>>>>>>> f251697f32330ced84df97760bd60393a2eea290
}

export default App;
