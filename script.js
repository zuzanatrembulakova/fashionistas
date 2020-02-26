if (document.getElementById("script_args") != null) {
    var type = document.getElementById("script_args").getAttribute("arg1")
};

const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

const link = "https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

const divmain = document.querySelector("main");


if (document.querySelector(".burger_menu") != null) {
    const bmenu = document.querySelector(".burger_menu");
    bmenu.addEventListener("click", function () {
        const navbar = document.getElementById("navbar");
        if (navbar.style.display === "block") {
            navbar.style.display = "none";
        } else {
            navbar.style.display = "block";
        }
    })
} else {
    navbar.style.display = "flex";
};


function getData() {
    fetch(link)
        .then(res => res.json())
        .then(handleData)
}

function handleData(data) {
    const myData = data.feed.entry;
    console.log(myData);

    //create categories
    var categories = new Set();
    myData.forEach(function (item) {
        if (item.gsx$season.$t == type) {
            categories.add(item.gsx$category.$t);
        }
    })

    categories.forEach(function (oneCategory) {
        const section = document.createElement("section");
        section.id = oneCategory;
        const h2 = document.createElement("h2");
        h2.textContent = oneCategory;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })

    myData.forEach(showData);
}

function showData(item) {

    if (item.gsx$season.$t == type) {
        const template = document.querySelector("template").content;

        var aCopy = template.cloneNode(true);
        aCopy.querySelector(".buy_me_btn").addEventListener("click", function () {
            if (item.gsx$soldout.$t == "FALSE") {
                addToBasket(item.gsx$id.$t);
                /*document.querySelector(".shoppingcart_icon").src = "icons/shopping-cart-black-sm.png";*/
            }
        });

        aCopy.querySelector(".image").src = "images/" + item.gsx$image.$t + ".png";

        if (item.gsx$soldout.$t == "TRUE") {
            aCopy.querySelector(".buy_me_btn").textContent = "SOLD OUT";
            /*aCopy.querySelector(".sold_out_text").style.display = "inline";*/
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
                fetch(`https://spreadsheets.google.com/feeds/list/1DVAg6s7LifjTSAXIaS7VHV0RBByKoWiT9NW8ay4at9Y/od6/public/values?alt=json`)
                    .then(res => res.json())
                    .then(showDetails);
        });
                document.querySelector(`#${item.gsx$category.$t}`).appendChild(aCopy);
            }

        }

        function addToBasket(id) {
            var buydata = localStorage.getItem("fashion_basket");
            var buyarr = [];
            if (buydata != null) {
                buyarr = JSON.parse(buydata);
            }

            buyarr.push(id);

            localStorage.setItem("fashion_basket", JSON.stringify(buyarr));

        }


        window.onscroll = function () {
            scrollFunction()
        };


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

        function showDetails(data) {
            modal.querySelector(".modal-name").textContent = data.name;
            modal.querySelector(".modal-description").textContent = data.longdescription;
            //...
            modal.classList.remove("hide");
        }
