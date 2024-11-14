import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import Menu from './components/subcomponents/Menu';
import LoginPage from './components/LoginPage';
import RejestrationPage from './components/RejestationPage';
import TaskList from './components/subcomponents/TaskList';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/task",
        element: <TaskList />,
      },
      {
        path: "/menu",
        element: <Menu />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rejestration",
    element: <RejestrationPage/>,
    errorElement: <ErrorPage/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

