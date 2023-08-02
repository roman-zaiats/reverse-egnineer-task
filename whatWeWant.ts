import { Observable } from 'rxjs';

type SubscribeToPlaceIdsUpdates = (eventId: string) => Observable<string[]>

const createSubscription: SubscribeToPlaceIdsUpdates = (eventId) => {

  //1. make a call to fetch available place IDS (https://pubapi.ticketmaster.com/sdk/static/manifest/v1/15005E58EEB15F8A)

  //2. create graphql subscription to fetch availability data

  //3. Most important: extract availability indices from protobuf/wasm data

  //4. return observable that will listen to updates from website, extract availability indices from protobuf/wasm and will get place IDs from manifest for those indices. Finaly it should return place IDs to the subscriber.

  return null as unknown as Observable<string[]>;
}

