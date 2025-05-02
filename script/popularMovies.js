import { fetchPopularMovies } from './api.js';
import { renderPopularMovies } from './ui.js';

export async function loadPopularMovies() {
    try {
        const data = await fetchPopularMovies();
        renderPopularMovies(data);
    } catch (err) {
        alert("영화 정보를 받아오는 데 실패했습니다.");
    }
}