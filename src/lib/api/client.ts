type ApiClientOptions = {
  baseUrl?: string;
};

export function createApiClient({ baseUrl = "" }: ApiClientOptions = {}) {
  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return response.json() as Promise<T>;
    }
  };
}
