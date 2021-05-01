import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import ComponentScreen from "./ComponentScreen/ComponentScreen";
import {
  UserStorageUpdateFormatter,
  UserStorageValue,
} from "./DataStore/UserStore";
import LandingPage from "./LandingPage/LandingPage";
import LogIn from "./LogIn/LogIn";
import MainScreen from "./MainScreen/MainScreen";
import { verifyUser } from "./Network/NetworkAuth";
import SignUp from "./SignUp/SignUp";

export const path = {
  logIn: "/logIn",
  home: "/landing",
  loggedinLandingPage: "/mainScreen",
  componentDesign: "/componentScreen",
  signUp: "/signUp",
};

function App() {
  const [, UserStorageTrigger] = UserStorageValue();
  const history = useHistory();
  const onLogIn = () => {
    history.push(path.logIn);
  };
  const onSignUp = () => {
    history.push(path.signUp);
  };
  const onSignUpSucess = () => {
    history.push(path.logIn);
  };
  const onLoginSubmit = (data, errorupdate) => {
    verifyUser(data.username, data.password)
      .then((data) => {
        console.log(data);
        UserStorageTrigger(
          UserStorageUpdateFormatter(data.username, data.profilePicture)
        );
        history.replace(path.home);
        history.push(path.loggedinLandingPage);
      })
      .catch((error) => {
        errorupdate(error);
      });
  };
  useEffect(() => {
    history.push(path.home);
  }, []);
  return (
    <div className="App">
      <Route path={path.home} exact={true}>
        <LandingPage onLogIn={onLogIn} onSignUp={onSignUp}></LandingPage>
      </Route>
      <Route path={path.logIn} exact={true}>
        <LogIn onLogIn={onLoginSubmit}> </LogIn>
      </Route>
      <Route
        path={path.loggedinLandingPage}
        exact={true}
        component={MainScreen}
      />
      <Route
        path={path.componentDesign}
        exact={true}
        component={ComponentScreen}
      />
      <Route path={path.signUp} exact={true}>
        <SignUp onSucess={onSignUpSucess}></SignUp>
      </Route>
    </div>
  );
}

export default App;
