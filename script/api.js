import { TMDB_API_KEY } from './apikey.js';
const baseURL = 'https://api.themoviedb.org/3/';

export async function searchMovies(query) {
    const url = `${baseURL}search/movie?api_key=${TMDB_API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

export async function fetchPopularMovies() {
    const url = `${baseURL}movie/popular?api_key=${TMDB_API_KEY}&language=ko-KR`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

export async function fetchMovieDetails(movieId) {
    const url = `${baseURL}movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko-KR`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}