const articles = [], image = document.querySelector('.photo'), photographer = document.querySelector('.photographer'),counter = document.querySelector('.counter'),likeBtn = document.querySelector('.like'),backBtn = document.querySelector('.back'), nextBtn = document.querySelector('.next');
let countPhoto = 0;
let api_key = "m6vBGQEF_u8apsBICtnFU56j-Z_ADx7AQYZol9NxeYo";
async function getFetch() {

    const url = 'https://api.unsplash.com/photos/random/?client_id='+api_key;
    const response = await fetch(url);
    if (response.ok) { 
        const json = await response.json();
        const article = {};
        article.photo = json.links.download;
        article.name = json.user.first_name;
        article.lastName = json.user.last_name;
        articles.push(article);
        localStorage.setItem('articles', JSON.stringify(articles));
        photographer.textContent = `${article.name} ${article.lastName}`;
        image.src = articles[articles.length - 1].photo;
        return article;
    }
};
getFetch();

(function isLiked() {
if (JSON.parse(localStorage.getItem('likes'))) {
    let likes = JSON.parse(localStorage.getItem('likes'));
    counter.textContent = likes;
}
})();

likeBtn.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('likes'))) {
        let likes = JSON.parse(localStorage.getItem('likes'));
        likes++;
        localStorage.setItem('likes', JSON.stringify(likes));
        counter.textContent = likes;
    } else {

        localStorage.setItem('likes', JSON.stringify(1));
        counter.textContent = '1';
    }
});

backBtn.addEventListener('click', () => {
    const array = JSON.parse(localStorage.getItem('articles'));
    if (array.length - 1 - countPhoto) {
        countPhoto++;
        photographer.textContent = `${array[array.length - 1 - countPhoto].name} ${array[array.length - 1 - countPhoto].lastName}`;
        image.src = articles[articles.length - 1 - countPhoto].photo;
    }
});

nextBtn.addEventListener('click', () => {
    const array = JSON.parse(localStorage.getItem('articles'));
    if (countPhoto) {
        countPhoto--;
        photographer.textContent = `${array[array.length - 1 - countPhoto].name} ${array[array.length - 1 - countPhoto].lastName}`;
        image.src = articles[articles.length - 1 - countPhoto].photo;
    } else {
        getFetch().then(function (result) { },
            error => console.log(error));
    }
});