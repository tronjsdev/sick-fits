import fetch from 'isomorphic-unfetch';

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  }
  const error: any = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

export async function sampleFetchWrapper(input: RequestInfo, init?: RequestInit) {
  try {
    const data = await fetch(input, init).then(res => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function xfetch(input: RequestInfo, init?: RequestInit) {
  try {
    const data = await fetch(input, init).then(checkStatus);
    // .then(res => res.json())
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
