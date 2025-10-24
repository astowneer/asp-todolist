import {
  ApiEndpoints,
  ApiPath,
  ContentType,
  HttpMethods,
} from "../common/common";
import type { Http } from "./http.service";

type UserDto = {
  id: string;
  username: string;
};

type RegisterUserDto = {
  username: string;
  password: string;
};

type RegisterUserResponse = UserDto;

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Auth {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.basePath = ApiPath.AUTH;
    this.http = http;
  }

  public register(user: RegisterUserDto): Promise<RegisterUserResponse> {
    return this.http.load(this.getUrl(ApiEndpoints.REGISTER), {
      method: HttpMethods.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(user),
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}/${this.basePath}/${path}`;
  }
}

export { Auth };
