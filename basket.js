var buydata = localStorage.getItem("fashion_basket");
var buyarr = [];
if (buydata != null) {
    buyarr = JSON.parse(buydata);
}

console.log(buyarr);

const bmenu = document.querySelector(".burger_menu");
bmenu.addEventListener("click", function(){
    const navbar = document.getElementById("navbar");
    if(navbar.style.display === "block"){
        navbar.style.display = "none";
    }else{
        navbar.style.display = "block";
    }
})

const database_link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

const divmain = document.querySelector("main");

function getData() {
    fetch(database_link)
        .then(res => res.json())
        .then(handleData)
}

function handleData(data) {
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(showData);
}

function showData(item) {

    if (buyarr.includes(item.gsx$id.$t)) {
        console.log("zobrazujem: " + item.gsx$id.$t);
        const template = document.querySelector("template").content;

        var aCopy = template.cloneNode(true);

        aCopy.querySelector(".image").src = "images/" + item.gsx$image.$t + ".png";
        aCopy.querySelector(".basket_item_title").textContent = item.gsx$name.$t;

        aCopy.querySelector(".basket_item_price").textContent = item.gsx$price.$t + ".00 €";

        divmain.appendChild(aCopy);
    }
}


document.querySelector(".empty_basket_btn").addEventListener("click", function () {
    localStorage.removeItem("fashion_basket");
    window.location.reload();


})
