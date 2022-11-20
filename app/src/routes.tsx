import { useRoutes } from 'react-router-dom';
import Dashboard from './views/Dashboard';

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]);

    return routes;
}
