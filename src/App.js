import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import { privateRoutes,publicRoutes } from './routes/router';
import DefaultLayout from './layouts/DefaultLayout';
import React, { Fragment } from 'react';
import NotFound from './pages/NotFound';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoAccess from "./pages/NoAccess";
import PrivateRoute from "./configs/privateRoute";

function App() {
    return (
        <>
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
                                    <PrivateRoute
                                        element={
                                            <Layout>
                                                <Page/>
                                            </Layout>
                                        }
                                    />
                                }
                            />
                        })
                    }

                    <Route path='*' element={<NotFound/>}/>
                    <Route path="/no-access" element={<NoAccess/>} />

                </Routes>
            </BrowserRouter>

            <ToastContainer/>

        </>
    );
}

export default App;