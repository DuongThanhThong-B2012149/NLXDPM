import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import Login from "./pages/Login";
import Messenger from "./pages/Messenger";
import Register from "./pages/Register";
function App() {
  const user = useSelector((state) => state.user?.currentUser);
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io("ws://localhost:8900");
      socket.current.emit("addUser", user._id);
    }
  }, [user]);
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          {user ? <Messenger socket={socket} /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
