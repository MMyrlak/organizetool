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
import TaskListDemo from './components/subcomponents/TaskListDemo';
import TaskAdd from './components/subcomponents/TaskAdd';
import TaskAddDemo from './components/subcomponents/TaskAddDemo';
// import UserAdd from './components/subcomponents/UserAdd';
import UserAdd from './components/subcomponents/UserAdd-DataTable';
import UserAddDemo from './components/subcomponents/UserAdd-DataTableDemo';
import UserMe from './components/subcomponents/UserMe';
import UserMeDemo from './components/subcomponents/UserMeDemo';
import EmailVerification from './components/EmailVerification';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/task",
        element: <TaskListDemo />,
      },
      {
        path: "/userAdd",
        element: <UserAddDemo />,
      },
      {
        path: "/",
        element: <TaskListDemo />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/taskAdd",
        element: <TaskAddDemo />,
      },
      {
        path: "/me",
        element: <UserMeDemo />,
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

