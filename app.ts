import initRasSDK from './rasSdk';
import { CustomWebSocket } from './ws';
import { fetchLocal } from './nodeFetch';
import { getProxyAgent } from './proxyAgent';
import { initJSDOM, getUserAgent } from './jsdom';

import {config} from 'dotenv'

config();
const eventId = '15005E58EEB15F8A';
const sessionId = '3:jHdsZ7WA5A/ed5ABhd0yyg==:Obo6FzaBDA7/8bvx3ZG9BT9T/FzHATaeeRaMtfYox3DGWOI2hGBjemqnuHKZfqPssXgQFlmcf9DSu6HJy7W0+jLT8tpm5r+sWUsmgfHxiAemq+Z1eIaAom+yUMBqC0TfdXxtpsdbjB7FNObs56C3hC+QLK/UpbrUtUWwFIVfric915oLigc1FIGXwbLFGxUew/EEofGrfwZo8maemDphA+BfGu4ZvDSdGLZ+8zMbqDgIAJn+ji04m1cBzyKmoYo8aM2XKiQcULBfuVVNZa5nAKqUchuEXVEV/qTTyjY8niXdLKdrdc3KizVP7eCwneCWvvl50nBeEhNHktMq+l2y41QJ+p5InFBWQNzssXtanfLl5s409N5kRDOZiyjKQesb7IQda/mL0Z/LlRpoY0EftkAF64L2C8eFz+32aAfomQ4munqvYVeWLlthoJGjMCQqNtreI8zF9RYnMasvVAsCgg==:ImtK56kP2+34u79/6AbruJ7bmYvpvIpIa/untIMyKFI=';

const subscribe = async (eventId: string) => {
  const { window } = initJSDOM();
  const proxyAgent = getProxyAgent();

  const fetch = fetchLocal({
    proxyAgent,
    userAgent: getUserAgent(),
  });

  const rasSdk = await initRasSDK({
    avscURL: 'https://pubapi.ticketmaster.com',
    avppURL: 'wss://marketplace.prod.pub-tmaws.io',
    geometryURL: 'https://supermaps.prod.us-east-1.pub-tmaws.io',
    manifestURL: 'https://pubapi.ticketmaster.com',
    app: 'PRD2663_EDPAPP',
    remoteLogging: true,
    sessionId,
  }, {
    fetch,
    proxyAgent,
    window,
    document: window.document,
    CustomWebSocket,
  });

  const subscription = rasSdk.observeEventAvailability(eventId, {}).subscribe({
    next: (t: any) => {
      const placeIds = t.getAvailablePlaceIds();

      console.log('These place IDs have been released:', placeIds);

      console.log('unsubscribing');
      subscription.unsubscribe();
    },
  });
};

(async () => {
  subscribe(eventId);
})().catch(e => console.error(e));
