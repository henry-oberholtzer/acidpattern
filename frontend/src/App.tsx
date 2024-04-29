import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root';
import { ErrorPage } from './routes/error-page';
import { PatternListView } from './routes/patterns/PatternListView';
import { UserListView } from './routes/users/UserListView';
import { api } from './scripts/api';
import { RegisterView } from './routes/auth/RegisterView';
import { registerAction } from './scripts/actions';
import { LogInView } from './routes/auth/LogInView';
import { LogOutView } from './components/LogOutView';
import { PatternCreateView } from './routes/patterns/PatternCreateView';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PatternDetailView } from './routes/patterns/PatternDetailView';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
			loader: api.patterns,
			children: [
				{
					path: '',
					element: <PatternCreateView />
				},
				{
					path: 'patterns/',
					element: <PatternListView />,
					loader: api.patterns,
				},
				{
					path: 'patterns/id',
					element: <PatternDetailView />,
				},
				{
					element: <ProtectedRoute />,
					children: [
						{
							path: 'users/',
							element: <UserListView />,
							loader: api.users,
						},
						
					],
				},
				{
					path: 'login/',
					element: <LogInView />,
				},
				{
					path: 'logout/',
					element: <LogOutView />,
				},
				{
					path: 'register/',
					element: <RegisterView />,
					action: registerAction,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export { App };
