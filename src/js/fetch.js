export default { fetchCountry };

 function fetchCountry(nameCountry) {
  return  fetch(`${BASE_URL}${nameCountry}`).then(r=>r.json);
  // return  response.json();
}

const BASE_URL = 'https://restcountries.com/v2/name/';

