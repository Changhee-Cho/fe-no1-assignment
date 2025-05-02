import { searchMovies } from './api.js';
import { renderSearchResults } from './ui.js';

let debounceTimer;

export function setupSearchForm() {
    const form = document.getElementById('form');
    const input = document.getElementById('search');

    form.addEventListener('submit', async (e) => {
        document.getElementById('backdesign').style = 'display:none';
        document.getElementById('banner').style = 'display:none';
        document.getElementById('globalrankingtitle').innerText = '검색 결과';
        e.preventDefault();
        input.blur();
        const query = input.value.trim();
        if (!query) return;

        try {
            const data = await searchMovies(query);
            renderSearchResults(data);
        } catch (err) {
            alert("검색 중 오류가 발생했습니다.");
        }
    });

    input.addEventListener('input', () => {
        document.getElementById('backdesign').style = 'display:none';
        document.getElementById('banner').style = 'display:none';
        document.getElementById('globalrankingtitle').innerText = '검색 결과';
        clearTimeout(debounceTimer);
        const query = input.value.trim();
        if (!query) return;

        debounceTimer = setTimeout(async () => {
            try {
                const data = await searchMovies(query);
                renderSearchResults(data);
            } catch (err) {
                alert('자동 검색에서 문제가 생겼습니다.')
            }
        }, 500);
    });
}
