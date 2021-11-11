export default { fetchCountry };

async function fetchCountry(nameCountry) {
  const response = await fetch(`${BASE_URL}${nameCountry}`);
  return await response.json();
}

const BASE_URL = 'https://restcountries.com/v2/name/';

