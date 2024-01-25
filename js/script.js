const goTab = document.getElementById('goSearch');
const searchTab = document.getElementById('searchInput');
const newsImages = document.querySelectorAll('.loadImages');
const newsTitles = document.querySelectorAll('.title');
const newsDescription = document.querySelectorAll('.description');
const newUrl = document.getElementsByTagName('a');

const apiKey = "7bc36466cef54d26bbd835df2170fe9c";

goTab.addEventListener("click", () => {
    getData();
});

searchTab.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getData();
    }
});

async function getData() {
    const inputValue = searchTab.value;
    const url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${apiKey}`;
    const newInfo = await fetch(url);
    const newsData = await newInfo.json();
    console.log(newsData);

    let count = 0;
    for (let i = 0; i < newsData.articles.length; i++) {
        newsImages[i].src = newsData.articles[i].urlToImage;
        newsTitles[i].innerHTML = newsData.articles[i].title;
        newsDescription[i].innerHTML = newsData.articles[i].description;
        newUrl[i].href = newsData.articles[i].url;
        count++;
        if (count === 9) {
            break;
        }
    }
}

    // const url = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${apiKey}`;
    // const newInfo = await fetch(url)
    // const newsData = await newInfo.json();
    // console.log(newsData);


    // let count = 0;
    // for(let i=0; i<newsData.articles.length; i++){
    //     // console.log(newsData.articles[i]);
    //     newsImages[i].src=newsData.articles[i].urlToImage;
    //     newsTitles[i].innerHTML =newsData.articles[i].title;
    //     newsDescription[i].innerHTML =newsData.articles[i].description;
    //     newUrl[i].href =newsData.articles[i].url;
    //     count++;
    //     if(count===9){
    //         break;
    //     }
    // }


