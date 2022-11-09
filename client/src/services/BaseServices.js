import axios from "axios";

export class BaseService {
  get = (url) => {
    return axios({
      url,
      method: "GET",
    });
  };

  post = (url, model) => {
    return axios({
      url,
      data: model,
      method: "POST",
    });
  };
}
