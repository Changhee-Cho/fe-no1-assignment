import { fetchMovieDetails } from './api.js';
import { renderSearchResults } from './ui.js';

export function setupBookmarkView() {
    const bookmarkBtn = document.querySelector('.gobookmark');

    bookmarkBtn.addEventListener('click', async () => {
        document.getElementById('backdesign').style.display = 'none';
        document.getElementById('banner').style.display = 'none';
        document.getElementById('globalrankingtitle').innerText = '내 북마크 목록';

        const bookmarkIds = JSON.parse(localStorage.getItem('bookmarks')) || [];

        const movieDataPromises = bookmarkIds.map(id => fetchMovieDetails(id));
        try {
            const movieDataList = await Promise.all(movieDataPromises);
            renderSearchResults(movieDataList);
        } catch (err) {
            alert('북마크 데이터를 불러오는 데 실패했습니다.');
        }
    });
}