import { setupSearchForm } from './searchInput.js';
import { loadPopularMovies } from './popularMovies.js';
import { setupBookmarkView } from './bookmark.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSearchForm();
    loadPopularMovies();
    setupBookmarkView();
});