import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./page/Loading";
import Home from "./page/Home";

const Signup = lazy(() => import("./page/Signup"));
const Login = lazy(() => import("./page/Login"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Explore = lazy(() => import("./page/Explore"));
const PrivateRoute = lazy(() => import("./context/PrivateRoute"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Navbar />
            {/* <PrivateRoute path="/" element={<Dashboard />} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              {/* <Route path="/notfound" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
