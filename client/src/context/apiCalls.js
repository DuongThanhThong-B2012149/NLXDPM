import { authServices } from "../services/AuthServices";
import { login, loginFailed, loginSuccess } from "./userSlice";
export const loginUser = async (user, dispatch) => {
  dispatch(login());
  try {
    const res = await authServices.post(
      "http://localhost:8080/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    console.log("login thanh cong");
  } catch (err) {
    dispatch(loginFailed());
  }
};
