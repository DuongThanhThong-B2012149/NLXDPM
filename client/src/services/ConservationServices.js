import axios from "axios";
import { BaseService } from "./BaseServices";

export class ConservationServices extends BaseService {
  constructor() {
    return super();
  }

  get = (url) => {
    return axios({
      url,
      method: "GET",
    });
  };
}

export const conservationServices = new ConservationServices();
