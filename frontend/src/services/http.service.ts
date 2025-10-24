import {
  ContentType,
  HttpHeader,
  HttpMethods,
  type ValueOf,
} from "../common/common";

type HttpOptions = {
  method: ValueOf<typeof HttpMethods>;
  contentType: ValueOf<typeof ContentType>;
  payload: BodyInit | null;
  authToken?: string;
};

class Http {
  public load<T = unknown>(
    url: string,
    options: Partial<HttpOptions>
  ): Promise<T> {
    const {
      method = HttpMethods.GET,
      payload = null,
      contentType,
      authToken,
    } = options;

    const headers = this.getHeaders(contentType, authToken);

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(
    contentType?: ValueOf<typeof ContentType>,
    authToken?: string
  ): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (authToken) {
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${authToken}`);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response;
  }

  private async parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
