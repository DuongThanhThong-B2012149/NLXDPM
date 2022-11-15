import axios from "axios";
import { BaseService } from "./BaseServices";

export class AuthServices extends BaseService {
  constructor() {
    return super();
  }

  post = (url, model) => {
    return axios({
      url,
      data: model,
      method: "POST",
    });
  };
}

export const authServices = new AuthServices();
