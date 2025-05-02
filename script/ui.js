export function renderSearchResults(data) {
    const datainput = document.getElementById("datainput");
    datainput.innerHTML = '';

    if (data.length > 0) {
        data.forEach(movie => {
            let posterImg = movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'assets/imgs/noPoster.PNG';
            let overview = movie.overview || '-소개 글이 없습니다.-';
            const temp_html = `
                <div class="item" id="${movie.id}">
                    <img src="${posterImg}" alt="영화 포스터">
                    <h3>${movie.title}</h3>
                    <h4>평점: ${movie.vote_average}</h4>
                    <h5>${overview}</h5>
                </div>
            `;
            datainput.innerHTML += temp_html;
        });
    } else {
        datainput.innerHTML = `
            <div class="resultnotice">
                <img src="assets/imgs/notfound.svg" alt="not found">
                <p>검색 결과가 없습니다!</p>
            </div>
        `;
    }
}

export function renderPopularMovies(data) {
    const datainput = document.getElementById("datainput");
    let count = 0;
    data.forEach(async movie => {
        count++;
        let posterImg = movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'assets/imgs/noPoster.PNG';
        let movieOverview = movie.overview ? movie.overview : '-한글로 된 줄거리가 없습니다.-';
        const temp_html = `
            <div class="item" id="${movie.id}">
                <img src="${posterImg}" alt="영화 포스터">
                <h3>${movie.title}</h3>
                <h4>평점: ${movie.vote_average}</h4>
                <h5 id='overview'>${movieOverview}</h5>
                <p class="rank">#${count}</p>
            </div>
        `;
        datainput.innerHTML += temp_html;
    });
}