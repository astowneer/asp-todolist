import { ENV } from "../common/common";
import { Auth } from "./auth.service";
import { Http } from "./http.service";
import { TodoList } from "./todo-list.service";

const http = new Http();

const users = new Auth({
  baseUrl: ENV.API.URL,
  http,
});

const todoList = new TodoList({
  baseUrl: ENV.API.URL,
  http,
});

export { users, todoList };
