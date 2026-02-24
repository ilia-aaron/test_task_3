// Независимый сервис для работы с сетевыми запросами,
// тут можно менять реализацию работы с сетью и легко менять библиотеку например fetch на axios или XMLHttpRequest
// реализовывать reconnects / ретраи / авторизацию / логирование и пр.

export type BaseRequestParams = Record<
  string,
  string | number | boolean | undefined | null
>;
export type FetchServiceRequestOptions = Omit<RequestInit, "method"> & {
  params?: BaseRequestParams;
};

class FetchService {
  private async request<T>(
    url: string,
    options: RequestInit & {
      params?: BaseRequestParams;
    },
  ): Promise<{ data: T; response: Response }> {
    const urlObj = new URL(url);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          urlObj.searchParams.set(key, String(value));
        }
      });
    }

    const { params, ...initOptions } = options;

    const response = await fetch(urlObj.toString(), initOptions);

    let data: T;
    try {
      data = await response.json();
    } catch {
      data = null as T;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { data, response };
  }

  // пока реализованы только GET запросы, так как в задаче нужен только get
  // по мере необхоимости добавить POST, PUT, DELETE и пр.

  async get<T>(
    url: string,
    options?: FetchServiceRequestOptions,
  ): Promise<{ data: T; response: Response }> {
    return this.request<T>(url, { ...options, method: "GET" });
  }
}

export const fetchService = new FetchService();
