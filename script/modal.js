import { fetchMovieDetails } from './api.js';

const modalBox = document.getElementById('modalbox');
const modal = document.querySelector('.modal');
const modalContents = document.querySelector('.modal_contents');
const modalExit = document.querySelector('.modalexit');

let currentMovieId = null;

document.addEventListener('click', async (e) => {
    const item = e.target.closest('.item');
    if (!item) return;

    const movieId = parseInt(item.id);
    currentMovieId = movieId;

    try {
        const data = await fetchMovieDetails(movieId);
        const posterImg = data.poster_path
            ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
            : 'assets/imgs/noPoster.PNG';

        const isBookmarked = checkIfBookmarked(movieId);
        document.querySelector('.bookmark').src = isBookmarked
            ? 'assets/imgs/bookmark_added.svg'
            : 'assets/imgs/bookmark_before.svg';

        modalContents.innerHTML = `
            <h1>${data.title}</h1>
            <div class="center">
                <img class="modalposter" src="${posterImg}" alt="영화 포스터">
                <div class="content">
                    <p><h4>원제</h4><span>${data.original_title}</span></p>
                    <p><h4>원어</h4><span>${data.original_language}</span></p>
                    <p><h4>개봉일</h4><span>${data.release_date}</span></p>
                    <p><h4>평점</h4><span>${data.vote_average}</span></p>
                    <p><h4>인기도</h4><span>${data.popularity}</span></p>
                    <p><h4>평가자 수</h4><span>${data.vote_count}</span></p>
                    <hr>
                    <p class="overview_title"><h4>줄거리</h4></p>
                    <p class="overview">${data.overview || '-한글로 된 줄거리가 없습니다.-'}</p>
                </div>
            </div>
        `;

        modalBox.style.display = 'block';
    } catch (err) {
        alert("영화 정보를 불러오지 못했습니다.");
    }
});

modal.addEventListener('click', (e) => {
    const bookmarkImg = e.target.closest('.bookmark');
    if (!bookmarkImg || !currentMovieId) return;

    const isBookmarked = toggleBookmark(currentMovieId);
    bookmarkImg.src = isBookmarked
        ? 'assets/imgs/bookmark_added.svg'
        : 'assets/imgs/bookmark_before.svg';
});

modalExit.addEventListener('click', () => {
    modalBox.style.display = 'none';
});

function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

function checkIfBookmarked(id) {
    return getBookmarks().includes(id);
}

function toggleBookmark(id) {
    const bookmarks = getBookmarks();
    const index = bookmarks.indexOf(id);

    if (index === -1) {
        bookmarks.push(id);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert("북마크에 추가하였습니다!")
        return true;
    } else {
        bookmarks.splice(index, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert("북마크에서 삭제하였습니다!");
        return false;
    }
}
