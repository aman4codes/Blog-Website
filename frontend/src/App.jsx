import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes.jsx";
import ProtectedRoutes from "./routes/protectedRoutes.jsx";
import { publicRoutes, protectedRoutes } from "./routes/routes.jsx";

function App() {
  return (
    <div className="min-h-screen min-w-screen border-2 border-black">
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRoutes>{route.element}</PublicRoutes>}
          />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoutes>{route.element}</ProtectedRoutes>}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
