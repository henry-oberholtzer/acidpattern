import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api } from '../scripts/api';

const LogOutView = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const postLogout = async () => {
		if (user != null) {
			const header: HeadersInit = {
				'Content-Type': 'application/json',
				Authorization: `Token ${user.token}`,
			};
			try {
				const response = await api.logout(header);
				return response;
			} catch (error) {
				return error;
			}
		}
	};

	useEffect(() => {
		if (user != null) {
			postLogout();
			logout();
			navigate('/', { replace: true });
		}
	});

	return <p>Logging out...</p>;
};

export { LogOutView };
