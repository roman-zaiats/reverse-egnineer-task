import { Agent } from 'http';
import nodeFetch, { RequestInit, HeadersInit } from 'node-fetch';

type TFetchLocalParams = { proxyAgent: Agent; userAgent: string; cookies?: string };
type TRequestInitHeaders = HeadersInit & { 'user-agent'?: string; cookie?: string };
type TExtendedRequestInit = RequestInit & { credentials?: string; headers?: TRequestInitHeaders };

export const fetchWrapper = ({ proxyAgent, userAgent, cookies }: TFetchLocalParams) =>
  async (url: string, options: TExtendedRequestInit = {}) => {
    if (!options.headers) {
      options.headers = {};
    }

    if (cookies) {
      options.headers.cookie = cookies;
    }

    options.agent = proxyAgent;
    options.headers['user-agent'] = userAgent;

    const result = await nodeFetch(url, options);

    if (result.status !== 200) {
      console.log(url, result);
      throw new Error(`${result.status}`);
    }

    return result.json();
  };

export const fetchLocal = ({ proxyAgent, userAgent, cookies }: TFetchLocalParams) =>
  (url: string, options: TExtendedRequestInit = {}) => {
    if (!options.headers) {
      options.headers = {};
    }

    if (options.credentials) {
      delete options.credentials;
    }

    if (cookies) {
      options.headers.cookie = cookies;
    }

    options.agent = proxyAgent;
    options.headers['user-agent'] = userAgent;

    console.log('fetchLocal', url, options);
    return nodeFetch(url, options);
  };
