import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyRoutes, MyRoutesIsAuth, type MyRoutesType } from './routes';

export const AppRouter: React.FC = () => {
  const isAuth = true
return (
<Routes>
  {MyRoutes.map((el: MyRoutesType)=>{
     const Component = el.component;
    return <Route key={el.url} path={el.url} element={<Component/>} />
  })}
  {isAuth ?? MyRoutesIsAuth.map((el:MyRoutesType)=>{
     const Component = el.component;
    return <Route key={el.url} path={el.url} element={<Component/>} />
  })}
 </Routes>
);
};