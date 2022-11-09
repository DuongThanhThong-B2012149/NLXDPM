import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { authServices } from "../services/AuthServices";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const form = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await authServices.post(
        "http://localhost:8080/api/auth/register",
        user
      );
      if (res) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <C>
      <Wrapper>
        <div className="loginLeft">
          <h3>CHAT APP</h3>
        </div>
        <div className="loginRight">
          <Box ref={form} onSubmit={handleClick}>
            <input placeholder="Username" ref={username} name="user_name" />
            <input placeholder="Email" ref={email} name="user_email" />
            <input type="password" placeholder="Password" ref={password} />

            <button className="loginButton" type="submit">
              Đăng kí
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">
                Đăng nhập vào tài khoản
              </button>
            </Link>
          </Box>
        </div>
      </Wrapper>
    </C>
  );
}
const C = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  .loginLeft,
  .loginRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .loginLeft {
    h3 {
      font-size: 50px;
      font-weight: 800;
      color: #1775ee;
      margin-bottom: 10px;
    }
    span {
      font-size: 24px;
    }
  }
`;
const Box = styled.form`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    height: 50px;
    margin: 15px 0;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
  }
  input:focus {
    outline: none;
  }
  .loginButton {
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  .loginForgot {
    text-align: center;
    color: #1775ee;
  }

  .loginRegisterButton {
    width: 60%;
    align-self: center;
    margin-top: 20px;
    margin-left: 100px;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
`;
