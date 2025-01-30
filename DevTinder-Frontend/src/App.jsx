import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./Helpers/appStore";
import { lazy, Suspense } from "react";

const Body = lazy(() => import("./components/Body"));
const Profile = lazy(() => import("./components/Profile"));
const Feed = lazy(() => import("./components/Feed"));
const Login = lazy(() => import("./components/Login"));
const Connections = lazy(() => import("./components/Connections"));
const Requests = lazy(() => import("./components/Requests"));
const Signup = lazy(() => import("./components/Signup"));

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/connections" element={<Connections />}></Route>
                <Route path="/requests" element={<Requests />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
