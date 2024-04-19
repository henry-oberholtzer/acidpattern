import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import { ErrorPage } from './routes/error-page';
import { PatternListView } from './routes/patterns/PatternListView';
import { UserListView } from './routes/users/UserListView';
import { api } from './scripts/api';
import { RegisterView } from './routes/auth/RegisterView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    loader: api.patterns,
    children: [
      {
        path: 'patterns/',
        element: <PatternListView/>,
        loader: api.patterns,
      },
      {
        path: 'users/',
        element: <UserListView />,
        loader: api.users,
      },
      {
        path: 'login/',
      },
      {
        path: 'register/',
        element: <RegisterView />,
        action: api.register,
      }
        ]
      }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
