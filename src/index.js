
import './sass/main.scss';
import countriesAll from './templates/countries.hbs';
import country from './templates/country.hbs';
import Fetch from './partials/fetchCountries';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import debounce from 'lodash.debounce';
defaultModules.set(PNotifyMobile, {});

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  countriesContainer: document.querySelector('.countriesConrainer'),
};

const fetchF = new Fetch();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function clearCountriesContainer() {
  refs.countriesContainer.textContent = '';
}

function createCountries(e) {
  return countriesAll(e);
}
function createCountry(e) {
  return country(e);
}
function appendCountry(e) {
  refs.countriesContainer.insertAdjacentHTML('beforeend', createCountry(e));
}

function appendCountries(e) {
  refs.countriesContainer.insertAdjacentHTML('beforeend', createCountries(e));
}

function deleteAlertContainer() {
  const alertContainersRefs = document.getElementsByClassName('pnotify');
  if (alertContainersRefs.length) {
    alertContainersRefs[0].remove();
  }
}

function onSearch(e) {
  const query = e.target.value;
  
  if (!query) return deleteAlertContainer()

  fetchF.queary = query;

  clearCountriesContainer();

  fetchF.fetchCountries().then(countries => {
    if (!countries.length) return alert({ text: 'No results found' });

    if (countries.length > 10) {
      return alert({
        text: 'Too many marches found. Please enter a more specific query',
      });
    }

    deleteAlertContainer();

    if (countries.length >= 2 && countries.length <= 10) {
      return appendCountries(countries);
    }

    if (countries.length <= 1) {
      appendCountry(countries);
    }
  });
}