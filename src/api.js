import axios from "axios";

const key = 'f81d785a308eb08854a29af0b40be926';

const options = {
    params: {
        api_key: key,
    },
}

export async function fetchTrendsApi() {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    try {
        const response = await axios.get(url, options);
        return response.data.results
      }   catch(err) {console.log(err)}
}

export async function fetchSearch(searchQuery) {
    const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
    const options = {
        params: {
            api_key: key,
            query: searchQuery
        },
    };
    try {
        const response = await axios.get(url, options);
        return response.data.results
      }   catch(err) {console.log(err)}
}

export async function fetchFilm(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    try {
        const response = await axios.get(url, options);
        return response.data
      }   catch(err) {console.log(err)}
}

export async function fetchCastApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
    try {
        const response = await axios.get(url, options);
        return response.data.cast
      }   catch(err) {console.log(err)}
}

export async function fetchReviewsApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
    try {
        const response = await axios.get(url, options);
        return response.data.results
      }   catch(err) {console.log(err)}
}