import React, {lazy, FC, Suspense} from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import NotFound from './layout/NotFound';

const PicturesMain = lazy(() => import('./pictures/Main'));

enum AppRoutes {
  'Pictures' = 'pictures'
}

const AppMain:FC = () => {
  return (
    <MainLayout>
      <Outlet/>
    </MainLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/*'>
            <Route path={`${AppRoutes.Pictures}/*`} element={<PicturesMain/>}/>
            <Route index element={<Navigate to={`./${AppRoutes.Pictures}`} replace/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes> 
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
