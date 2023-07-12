import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
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
import SplashFooter from "./components/HomePage/SplashPage/SplashFooter";
import LikedSongsPlaylist from "./components/SinglePlaylistPage/LikedSongsPlaylist";
import UserProfiles from "./components/UserProfiles";
import SearchBar from "./components/SearchBar";
import ReviewsPage from "./components/ReviewsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";

function App() {
  const location = useLocation()
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
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <ProtectedRoute path="/">
                <LibraryBar />
              </ProtectedRoute>
            </Switch>

            {location.pathname != "/" && location.pathname != "/login" && location.pathname != "/signup" &&
              <div className="changing-content">
                <Switch>
                  <ProtectedRoute path="/myreviews">
                    <GeneralNav />
                    <ReviewsPage />
                  </ProtectedRoute>
                  <ProtectedRoute path="/search">
                    <SearchBar />
                  </ProtectedRoute>
                  <ProtectedRoute path="/collection/tracks">
                    <GeneralNav />
                    <LikedSongsPlaylist />
                  </ProtectedRoute>
                  <ProtectedRoute path="/user/:username">
                    <GeneralNav />
                    <UserProfiles />
                  </ProtectedRoute>
                  <ProtectedRoute path="/album/:id">
                    <GeneralNav />
                    <SingleAlbumPage />
                  </ProtectedRoute>
                  <ProtectedRoute path="/playlist/:id">
                    <GeneralNav />
                    <SinglePlaylistPage />
                  </ProtectedRoute>
                  <ProtectedRoute path="/home">
                    <GeneralNav />
                    <HomePage />
                  </ProtectedRoute>
                  <Route>
                    <PageNotFound />
                  </Route>
                </Switch>
              </div>}
          </div>

          {location.pathname != "/login" && location.pathname != "/signup" &&
            <div className="footer">
              <Switch>
                <Route exact path="/">
                  <SplashFooter />
                </Route>
                <Route path="/">
                  <AudioBar />
                </Route>
              </Switch>
            </div>
          }
        </div >
      )
      }
    </>
  );
}

export default App;
