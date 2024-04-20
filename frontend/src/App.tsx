import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './routes/root';
import { ErrorPage } from './routes/error-page';
import { PatternListView } from './routes/patterns/PatternListView';
import { UserListView } from './routes/users/UserListView';
import { api } from './scripts/api';
import { RegisterView } from './routes/auth/RegisterView';
import { registerAction } from './scripts/actions';
import { LogInView } from './routes/auth/LogInView';
import { LogOutView } from "./components/LogOutView";

const App = () => {



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
          element: <LogInView />,
        },
        {
          path: 'logout/',
          element: <LogOutView />
        },
        {
          path: 'register/',
          element: <RegisterView />,
          action: registerAction,
        }
          ]
        }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export { App }
