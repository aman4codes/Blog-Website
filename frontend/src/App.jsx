import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div className="p-8">
              <h1>Welcome to the Blog App</h1>
              <p>
                <a href="/signup" className="text-(--accent) underline">
                  Signup
                </a>{" "}
                |{" "}
                <a href="/login" className="text-(--accent) underline">
                  Login
                </a>
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
