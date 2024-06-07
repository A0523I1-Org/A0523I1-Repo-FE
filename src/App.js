import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import { privateRoutes,publicRoutes } from './routes/router';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';
import NotFound from './pages/NotFound';


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

        <Route path='*' element = {<NotFound/>}/>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
