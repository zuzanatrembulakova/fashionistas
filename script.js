//get page type
//page type is retrieved from an atribute "arg1" which belongs to the
//element - script_args
if (document.getElementById("script_args") != null) {
    var type = document.getElementById("script_args").getAttribute("arg1")
};

//path to the database
const database_link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json";

const modal = document.querySelector(".modal-background");
if (document.querySelector(".modal-background") != null) {
    modal.addEventListener("click", () => {
        modal.classList.add("hide");
    })
};

window.addEventListener("DOMContentLoaded", getData);

const divmain = document.querySelector("main");

//if basket contains items display full basket icon
var buydata = localStorage.getItem("fashion_basket");
if (buydata != null) {
    showFullBasket();
}

//set up burger menu handler
const navbar = document.getElementById("navbar");
if (document.querySelector(".burger_menu") != null) {
    const bmenu = document.querySelector(".burger_menu");
    bmenu.addEventListener("click", function () {
        if (navbar.style.display === "flex") {
            navbar.style.display = "none";
        } else {
            navbar.style.display = "flex";
        }
    });
};

function getData() {
    fetch(database_link)
        .then(res => res.json())
        .then(handleData)
}

function handleData(data) {
    const myData = data.feed.entry;
    console.log(myData);

    //create categories
    var categories = new Set(); //create container for categories
    myData.forEach(function (item) {
        if (item.gsx$season.$t == type) {
            categories.add(item.gsx$category.$t);
        }
    })

    //create sections based on categories
    categories.forEach(function (oneCategory) {
         const a = document.createElement("a");
        a.setAttribute("href", `#${oneCategory}`);
        a.textContent = oneCategory;
        document.querySelector("aside>nav").appendChild(a);
        const section = document.createElement("section");
        section.id = oneCategory;
        const h2 = document.createElement("h2");
        h2.textContent = oneCategory;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })

    //for each item shows their content
    myData.forEach(showData);
}

function showData(item) {

    if (item.gsx$season.$t == type) {
        const template = document.querySelector("template").content;

        var aCopy = template.cloneNode(true);
        aCopy.querySelector(".buy_me_btn").addEventListener("click", function () {
            if (item.gsx$soldout.$t == "FALSE") {
                addToBasket(item.gsx$id.$t);
                showFullBasket();
            }
        });

        aCopy.querySelector(".image").src = "images/" + item.gsx$image.$t + ".png";

        if (item.gsx$soldout.$t == "TRUE") {
            var buy_btn = aCopy.querySelector(".buy_me_btn");

            buy_btn.textContent = "SOLD OUT";
            buy_btn.classList.remove("buy_me_btn");
            buy_btn.classList.add("sold_out_text");
            aCopy.querySelector(".image").classList.add("sold_out");

        } else {
            aCopy.querySelector(".image").classList.remove("sold_out");
        }

        if (item.gsx$discount.$t) {
            aCopy.querySelector(".discount").style.display = "inline";
            aCopy.querySelector(".discount").textContent = "-" + item.gsx$discount.$t + "%";
        } else {
            aCopy.querySelector(".discount").style.display = "none";
        }

        aCopy.querySelector(".read_more_btn").addEventListener("click", () => {
            showDetails(item)
        });
        document.querySelector(`#${item.gsx$category.$t}`).appendChild(aCopy);
    }

}
//add item based on id to the basket
//content of basket is stored to localStorage as an arry of ids
function addToBasket(id) {
    var buydata = localStorage.getItem("fashion_basket");
    var buyarr = [];
    if (buydata != null) {
        buyarr = JSON.parse(buydata);
    }

    buyarr.push(id);
    localStorage.setItem("fashion_basket", JSON.stringify(buyarr));
}

//change basket icon from empty to full
function showFullBasket() {
    if (document.querySelector(".shoppingcart_icon")) {
        document.querySelector(".shoppingcart_icon").src = "icons/shopping-cart-black-sm.png";
    }
}

/*-------GO TO TOP BTN------------------------------*/

//enable/disable scroll button based on scroller position
function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

window.onscroll = function () {
    scrollFunction()
};


/*---GO TO TOP BTN-------------------------------------*/

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


function showDetails(item) {
    modal.querySelector(".modal-name").textContent = item.gsx$name.$t;
    modal.querySelector(".modal-description").textContent = item.gsx$description.$t;
    modal.querySelector(".modal-image").src = "images/" + item.gsx$image.$t + ".png";
    modal.querySelector(".modal-price").textContent = item.gsx$price.$t + ".00 €";

    if (item.gsx$discount.$t) {
        modal.querySelector(".modal-discount").style.display = "inline";
        modal.querySelector(".modal-discount").textContent = "-" + item.gsx$discount.$t + "%";
    } else {
        modal.querySelector(".modal-discount").style.display = "none";
    }

    if (item.gsx$soldout.$t == "TRUE") {
        modal.querySelector(".modal-soldout").style.display = "inline";
    } else {
        modal.querySelector(".modal-soldout").style.display = "none";
    }

    modal.classList.remove("hide");
}
