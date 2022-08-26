import { lazy } from "react";

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Home = lazy(() => import('../pages/Home'));

const routes = {
    public: [
        { path: '/login', element: Login },
        { path: '/register', element: Register }
    ],
    private: [
        { path: '/home', element: Home },
        { path: '/home/ch=:id', element: Home },
        { path: '/home/sel=:id', element: Home },
    ]
};

export default routes;