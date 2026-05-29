import Dashboard from "../pages/dashboard";
import Home from "../pages/homePage";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const protectedRoutes = [
    {
        path : "/home",
        element : <Home/>
    },
    {
        path : "/dashboard",
        element : <Dashboard/>
    }
];

export const publicRoutes = [
    {
        path : "/login",
        element : <Login/>
    },
    {
        path: "/signup",
        element : <Signup/>
    }
]