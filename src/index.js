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
import History from './components/subcomponents/History';
import LoginPage from './components/LoginPage';
import RejestrationPage from './components/RejestationPage';
import TaskList from './components/subcomponents/TaskList';
import TaskAdd from './components/subcomponents/TaskAdd';
// import UserAdd from './components/subcomponents/UserAdd';
import UserAdd from './components/subcomponents/UserAdd-DataTable';
import UserMe from './components/subcomponents/UserMe';
import EmailVerification from './components/EmailVerification';
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
        path: "/userAdd",
        element: <UserAdd />,
      },
      {
        path: "/",
        element: <TaskList />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/taskAdd",
        element: <TaskAdd />,
      },
      {
        path: "/me",
        element: <UserMe />,
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
  },
  {
    path: "/emailverification",
    element: <EmailVerification/>,
    errorElement: <ErrorPage/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

