import { Search } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { logout } from "../context/userSlice";

export default function Topbar({ socket }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [notify, setNotify] = useState(undefined);
  const [test, setTest] = useState(undefined);

  const [open, setOpen] = useState(false);
  const [noLength, setNoLength] = useState(notifications.length);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
      setNotify(data);
    });
  }, [currentUser._id, setNotifications, socket]);

  useEffect(() => {
    if (notify !== undefined && test !== undefined) {
      const fectNotify = async () => {
        try {
          console.log(notify, test);
          await axios.put("/notify/add/" + test, notify);
        } catch (error) {}
      };
      fectNotify();
      setNotify(undefined);
      setTest(undefined);
    }
  }, [notify, test]);

  const hanlderClick = () => {
    try {
      dispatch(logout());
      history.push("/login");
      localStorage.removeItem("auth");
    } catch (error) {
      console.log(error);
    }
  };

  const displayNotification = ({ postId, senderName, type }, index) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    // console.log(postId);
    return (
      <Link to={"/posts/" + postId} key={index}>
        <span
          className="notification"
          onClick={() => setOpen(!open)}
        >{`${senderName} ???? ${action} b??i vi???t c???a b???n.`}</span>
      </Link>
    );
  };

  const handleRead = () => {
    setNoLength(0);
    setOpen(false);
  };

  return (
    <Wrapper>
      <Left>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CHAT APP</span>
        </Link>
      </Left>
      <Center>
        <div>
          <Search className="searchIcon" />
          <input placeholder="Search friend..." />
        </div>
      </Center>
      <Right>
        {currentUser && (
          <div onClick={hanlderClick} style={{ cursor: "pointer" }}>
            ????ng xu???t
          </div>
        )}
      </Right>
      {open && (
        <div className="notifications">
          {notifications &&
            notifications.map((n, index) => displayNotification(n, index))}
          <button className="nButton" onClick={handleRead}>
            ????nh d???u ???? xem
          </button>
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;

  .notifications {
    position: absolute;
    top: 50px;
    right: 20%;
    height: 200px;
    overflow-y: scroll;
    background-color: white;
    z-index: 99;
    color: black;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    border-radius: 8px;
    .notification {
      height: 40px;
      line-height: 40px;
      display: block;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      :hover {
        color: teal;
      }
    }

    .nButton {
      width: 100%;
      padding: 5px;
      height: 30px;
      margin-top: 10px;
      border: none;
      background-color: teal;
      color: white;
    }
  }
`;
const Left = styled.div`
  flex: 3;
  span {
    font-size: 24px;
    margin-left: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
`;
const Center = styled.div`
  flex: 5;
  div {
    width: 100%;
    height: 30px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;
    input {
      border: none;
      width: 70%;
    }
    input:focus {
      outline: none;
    }
    .searchIcon {
      font-size: 20px !important;
      margin-left: 10px;
    }
  }
`;
const Right = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  .links {
    span {
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .icons {
    display: flex;
    div {
      margin-right: 15px;
      cursor: pointer;
      position: relative;
      span {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        color: white;
        position: absolute;
        top: -5px;
        right: -5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
`;
