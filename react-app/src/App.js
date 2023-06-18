import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/NavigationBar/SplashPageNav";
import SplashPage from "./components/HomePage/SplashPage";
import HomePage from "./components/HomePage";
import LibraryBar from "./components/ConstantUserNav/LibraryBar"
import SinglePlaylistPage from "./components/SinglePlaylistPage";
import AudioBar from "./components/ConstantUserNav/AudioBar";
import GeneralNav from "./components/NavigationBar/GeneralNav";
import SingleAlbumPage from "./components/SingleAlbumPage";

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
                <LibraryBar />
              </Route>
            </Switch>

            <div className="changing-content">
              <Switch>
                <Route path="/album/:id">
                  <SingleAlbumPage />
                </Route>
                <Route path="/playlist/:id">
                  <GeneralNav />
                  <SinglePlaylistPage />
                </Route>
                <Route path="/home">
                  <GeneralNav />
                  <HomePage />
                </Route>
                <Route path="/login" >
                  <GeneralNav />
                  <LoginFormPage />
                </Route>
                <Route path="/signup">
                  <GeneralNav />
                  <SignupFormPage />
                </Route>
              </Switch>
            </div>
          </div>

          <Switch>
            <Route exact path="/">
              <h1>Info</h1>
            </Route>
            <Route path="/">
              <AudioBar />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
