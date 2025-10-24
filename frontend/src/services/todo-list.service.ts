import {
  ApiEndpoints,
  ApiPath,
  ContentType,
  HttpMethods,
  type TodoItemCreateDto,
  type TodoItemDto,
} from "@/common/common";
import type { Http } from "./http.service";

type Constructor = {
  baseUrl: string;
  http: Http;
};

class TodoList {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.basePath = ApiPath.TODOITEMS;
    this.http = http;
  }

  public loadAll(authToken: string): Promise<TodoItemDto[]> {
    return this.http.load(this.getUrl(ApiEndpoints.ROOT), {
      method: HttpMethods.GET,
      contentType: ContentType.JSON,
      authToken,
    });
  }

  public create({
    authToken,
    payload,
  }: {
    authToken: string;
    payload: TodoItemCreateDto;
  }): Promise<TodoItemDto> {
    return this.http.load(this.getUrl(ApiEndpoints.ROOT), {
      method: HttpMethods.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
      authToken,
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}/${this.basePath}/${path}`;
  }
}

export { TodoList };
