import { BaseService } from "./BaseServices";

export class AuthServices extends BaseService {
  constructor() {
    return super();
  }

  loginApi = async (data) => {
    // {email:'',password:''}
    return this.post("http://localhost:8080/api/auth/login", data);
  };

  registerApi = async (data) => {
    // {"firstName":"","lastName":"","email":"","password":""}
    return this.post("http://localhost:8080/api/auth/register", data);
  };
}

export const authServices = new AuthServices();
