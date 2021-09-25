import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import EmailList from "./EmailList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SendMail from "./SendMail";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser, login } from "./features/userSlice";
import { useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

export default function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app_body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>
          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}
