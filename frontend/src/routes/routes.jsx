import Login from "../pages/login";
import Signup from "../pages/signup";

export const protectedRoutes = [
    // {
    //     path : "/blogs",
    //     element : <Blogs/>
    // }
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