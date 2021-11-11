

import '../src/sass/styles.scss'

import countryTemplatesTpl from './templates/countryTemplates.hbs';
import countryListTpl from './templates/countryList.hbs';
import API from './js/fetch';
import { error } from '@pnotify/core';
import getRefs from './js/refs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

const refs = getRefs();
refs.inputRef.addEventListener('input', debounce(onSearch, 500))


function onSearch() {
    if (!refs.inputRef.value) {
        onCliearInput()
        return;
    }
    onCliearInput();



    const searchQuery = refs.inputRef.value;
    API.fetchCountry(searchQuery).then(country => {
        if (country.length > 10) {
            error({
                text: 'Too many matches found. Please enter a more specific query!'
            });
        } else if (country.status === 404) {
            error({
                text: 'Please enter the correct name'
            });
                } else if (country.length <= 10) {
            onCriateCountryList(country)
        } else if (country.length === 1) {
            onCriateCountryCard(country);
    
        }
    })
    .catch(onFetchError)
}

function onCriateCountryCard(country) {
    const markup = countryTemplatesTpl(country);
     refs.containerRef.innerHTML = markup;
}

function onCriateCountryList(country) {
    const markupList = countryListTpl(country);
    refs.countryListRef.innerHTML = markupList;
}

function onFetchError(error) {
    alert('Something went wrong')
}

function onCliearInput() {
    refs.containerRef.innerHTML = '';
    refs.countryListRef.innerHTML = '';
}