import axios from "axios";
import { BaseService } from "./BaseServices";

export class MessageServices extends BaseService {
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

  get = (url) => {
    return axios({
      url,
      method: "GET",
    });
  };
}

export const messageServices = new MessageServices();
