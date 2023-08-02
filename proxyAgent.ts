import { HttpsProxyAgent } from 'https-proxy-agent';

export const getProxyAgent = () =>
  new HttpsProxyAgent({
                        // @ts-ignore
                        rejectUnauthorized: false,
                        host              : 'localhost',
                        port              : '8888',
                        protocol          : 'http'
                      });
