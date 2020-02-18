/*const link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json"; window.addEventListener("DOMContentLoaded", getData);

function getData(){
    fetch(link)
    .then(res => res.json())
    .then(handleData)
}

function handleData(data){
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(showData);
}

const divmain = document.querySelector("main");

function showData(item){

    const template = document.querySelector("template").content;

    var aCopy = template.cloneNode(true);
    aCopy.querySelector("h2").textContent = item.gsx$id.$t;

    divmain.appendChild(aCopy);
}*/

window.onscroll = function () {
    stickybar()
    scrollFunction()
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickybar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

/*---GO TO TOP BTN-------------------------------------*/

function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

