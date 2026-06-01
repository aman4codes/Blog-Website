import Createblog from "../pages/createBlog";
import Dashboard from "../pages/dashboard";
import Home from "../pages/homePage";
import BlogDetails from "../pages/blogDetails";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const protectedRoutes = [
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/dashboard",
        element : <Dashboard/>
    },
    {
        path : "/createBlog",
        element : <Createblog/>
    },
    {
        path : "/blog/:id",
        element : <BlogDetails/>
    },
    {
        path : "/profile",
        element : <Profile/>
    },
    {
        path : "/edit-blog/:id",
        element : <Createblog isEdit={true} />
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