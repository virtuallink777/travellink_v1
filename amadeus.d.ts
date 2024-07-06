declare module 'amadeus' {
  export = Amadeus;
  
  class Amadeus {
    constructor(config: { clientId: string; clientSecret: string });
    shopping: {
      flightOffersSearch: {
        get(params: any): Promise<any>;
      };
    };
  }
}