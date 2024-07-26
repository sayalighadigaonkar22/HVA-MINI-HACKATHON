document.addEventListener('DOMContentLoaded', () => {
    const goTab = document.getElementById('goSearch');
    console.log(typeof(goTab));
    const searchTab = document.getElementById('searchInput');
    const newsImages = document.querySelectorAll('.loadImages');
    const newsTitles = document.querySelectorAll('.title');
    const newsDescriptions = document.querySelectorAll('.descriptionTitle');
    const newUrls = document.querySelectorAll('.descriptionLink');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');

    const apiKey = "7bc36466cef54d26bbd835df2170fe9c";
    let currentPage = 1;
    let totalResults = 0;

    const fetchData = async () => {
        const inputValue = searchTab.value;
        const url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${apiKey}&page=${currentPage}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            totalResults = data.totalResults;
            console.log('Total Results:', totalResults);

            newsImages.forEach((img, index) => {
                if (data.articles[index]) {
                    img.src = data.articles[index].urlToImage || '';
                    newsTitles[index].textContent = data.articles[index].title || '';
                    newsDescriptions[index].textContent = data.articles[index].description || '';
                    newUrls[index].href = data.articles[index].url || '#';
                } else {
                    img.src = '';
                    newsTitles[index].textContent = '';
                    newsDescriptions[index].textContent = '';
                    newUrls[index].href = '#';
                }
            });

            pageNumberSpan.innerText = `Page ${currentPage}`;
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage * 9 >= totalResults;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    goTab.addEventListener('click', fetchData);
    searchTab.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage * 9 < totalResults) {
            currentPage++;
            fetchData();
        }
    });
}); 