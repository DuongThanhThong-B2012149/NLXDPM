import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "../assets/avt.jpg";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <Wrapper>
      <img src={Avatar} alt="" />
      <span>{user?.username}</span>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
  span {
    font-weight: 500;
  }
  :hover {
    background-color: rgb(245, 243, 243);
  }
`;
