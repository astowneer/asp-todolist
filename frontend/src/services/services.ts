import { ENV } from "../common/common";
import { Auth } from "./auth.service";
import { Http } from "./http.service";

const http = new Http();

const users = new Auth({
  baseUrl: ENV.API.URL,
  http,
});

export { users };
