const link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

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

const divmain = document.querySelector("main");

function showData(item) {

    if (item.gsx$season.$t == "autumn") {
        const template = document.querySelector("template").content;

        var aCopy = template.cloneNode(true);

        aCopy.querySelector("h2").textContent = item.gsx$season.$t;

        divmain.appendChild(aCopy);
    }
}
