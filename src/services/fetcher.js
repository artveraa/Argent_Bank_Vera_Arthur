const headers = {
  Accept            : "application/json",
  "Content-Type"    : "application/json",
};

/**
 * It takes a url and a body, and returns a fetch request with the method POST, the headers, and the
 * body.
 * @param url - The URL to which the request is sent.
 * @param body - The body of the request.
 * @returns The response from the server.
 */
export const fetcherPost = async (url,body) => {
  return await fetch(
    url,{
      method    : "POST",
      headers   : headers,
      body      : JSON.stringify(body),
    })
};

/**
 * It takes a url, a type, a body, and a token, and returns a fetch request with the given url, type,
 * body, and token.
 * @param url - The url you want to fetch
 * @param type - GET, POST, PUT, DELETE
 * @param body - The body of the request.
 * @param token - the token that you get from the login request
 * @returns The response from the fetch request.
 */
export const fetcherWithToken = async (url,type, body, token) => {
  return await fetch(url, {
    method: type,
    headers: {
      Accept            : "application/json",
      "Content-Type"    : "application/json",
      Authorization     : `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};
