import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { api } from './scripts/api';
import {
	RegisterView,
	PatternListView,
	ErrorPage,
	Root,
	UserListView,
	LogInView,
	ProfileView,
	PatternDetailView,
	ProtectedRoute,
	PatternCreateView,
	LogOutView,
} from './routes';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
			loader: () => api.patterns(null),
			children: [
				{
					path: '',
					element: <PatternCreateView />,
				},
				{
					path: 'patterns/',
					element: <PatternListView />,
					loader: () => api.patterns(null),
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
						{
							path: 'profile/',
							element: <ProfileView />,
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
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export { App };
