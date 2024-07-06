import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: 'dusq4AeltBs7r1kdiAlciTiAEMr59xwl',
  clientSecret: '14tszjdizNwsOAPo'
});

amadeus.shopping.flightOffersSearch.get({
  originLocationCode: 'SYD',
  destinationLocationCode: 'BKK',
  departureDate: '2022-06-01',
  adults: '2'
}).then(function(response){
  console.log(response.data);
}).catch(function(responseError){
  console.log(responseError.code);
});