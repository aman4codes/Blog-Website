import { Route, Routes, Navigate } from "react-router";
import PublicRoutes from "./components/publicRoutes.jsx";
import ProtectedRoutes from "./components/protectedRoutes";
import { publicRoutes, protectedRoutes } from "./routes.jsx";

function App() {
  return (
    <div className="min-h-screen min-w-screen border-2 border-black">
      <Routes>

        
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
