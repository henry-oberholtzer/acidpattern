import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Root } from './routes/root';
import { ErrorPage } from './routes/error-page';
import { PatternListView } from './routes/patterns/PatternListView';
import { UserListView } from './routes/users/UserListView';
import { api } from './scripts/api';
import { RegisterView } from './routes/auth/RegisterView';
import { registerAction, loginAction } from './scripts/actions';
import { LogInView } from './routes/auth/LogInView';
import { AuthProvider } from './hooks/useAuth';

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
        action: loginAction,
      },
      {
        path: 'register/',
        element: <RegisterView />,
        action: registerAction,
      }
        ]
      }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Root/>}
            errorElement={<ErrorPage />}
          >
            <Route path='login/'
            element={<LogInView />}
            >
            
            </Route>
            <Route path='register/'
            element={<RegisterView />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
