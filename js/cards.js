var images = ['bewc.png', '_bewc.png']
var small_size = 500;
var large_size = small_size * 2;

function flipCard(img) {
    let path = img.src.split('/');
    let src = path.pop();
    if (src.substring(0, 1) == '_') src = src.substring(1, src.length);
    else src = '_' + src;
    path.push(src);
    let combiner = (prev, next) => prev + '/' + next;
    img.src = path.reduce(combiner);
}

// function getCards(){
//     var path = window.location.pathname;
//     var page = path.split("/").pop();
//     page = page.split('.').shift();
//     console.log( page );

//     var div = document.getElementById("cards");
//     var files = [];
//     images.forEach(element => {
//         console.log('../lib/buttmachine/' + element)
//         var img = new Image();
//         img.src = '../lib/buttmachine/' + element;
//         img.setAttribute('currentSize', 'small')
//         //img.addEventListener("mouseover", flipCard(img), false);
//         div.appendChild(img);
//     });
// }

function resize(img) {
    let small = '25%';
    let large = '50%';

    if (img.style.width == small) {
        img.style.width = large;
    }

    else {
        img.style.width = small;
    }
}