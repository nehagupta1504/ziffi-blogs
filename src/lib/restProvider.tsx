import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IHeaderOptions {
  [key: string]: string;
}

interface IRequestOptions {
  headers?: IHeaderOptions;
  body?: any;
}

const axiosClient = axios.create({
  timeout: 8000,
});

const restProvider = {
  get,
  post,
};

 async function get(url: string, headerOptions?: IHeaderOptions): Promise<any> {
  return await axiosClient.get(url, headerOptions).then(handleResponse).catch(handleError);
}

function post(url: string, body: any, header?: IHeaderOptions): Promise<any> {
  const headers: AxiosRequestConfig["headers"] = {
    ...header,
    "Content-Type": "application/json",
  };
  return axiosClient.post(url, JSON.stringify(body), { headers }).then(handleResponse).catch(handleError);
}


function handleResponse(response: AxiosResponse) {
  return response.data;
}

function handleError(error: any) {
  throw error.response;
}

export default restProvider;
