import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/HomePage/SplashPage";
import HomePage from "./components/HomePage";
import SinglePlaylistPage from "./components/SinglePlaylistPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="entire-page">
          <div className="home">
            <Switch>
              <Route exact path="/">
                <div className="splash-page-display">
                  <Navigation isLoaded={isLoaded} />
                  <SplashPage />
                </div>
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>

            <Switch>
              <Route path="/playlist/:id">
                <SinglePlaylistPage />
              </Route>
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
            </Switch>
          </div>

          <Switch>
            <Route exact path="/">
              <h1>Info</h1>
            </Route>
            <Route path="/">
              <h2>Insert Player Here</h2>
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
