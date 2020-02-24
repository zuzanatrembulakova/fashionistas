var buydata = localStorage.getItem("fashion_basket");
var buyarr = [];
if (buydata != null) {
    buyarr = JSON.parse(buydata);
}

console.log(buyarr);

const link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

const divmain = document.querySelector("main");

function getData() {
    fetch(link)
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
        aCopy.querySelector(".basket_item_title").textContent = item.gsx$image.$t

        divmain.appendChild(aCopy);
    }
}


document.querySelector(".empty_basket_btn").addEventListener("click", function () {
    localStorage.removeItem("fashion_basket");
    window.location.reload();


})
