import "./index.scss";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from "./hooks/useAuth";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home/home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Loading from "./pages/loading/Loading";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
