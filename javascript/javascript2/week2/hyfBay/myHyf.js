console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

//render products
function renderProducts(products) {
    products.forEach(product => {
        let myDiv = document.createElement("div")
        myDiv.classList.add("li-container");
        let myProduct = document.createElement("li");
        let myPrice = document.createElement("li");
        let myRating = document.createElement("li");
        let myUl = document.querySelector(".my-ul");
        myProduct.innerHTML = "<h2>" + product.name + "</h2>";
        myDiv.appendChild(myProduct);
        myPrice.innerHTML = "Price: " + product.price;
        myDiv.appendChild(myPrice);
        myRating.innerHTML = "Rating: " + product.rating;
        myDiv.appendChild(myRating);
        myUl.appendChild(myDiv);
    });
}

//unrender products
function unrenderProducts() {
    let myUl = document.querySelector(".my-ul");
    //myUl.innerHTML = "";
    while (myUl.firstChild) {
        myUl.removeChild(myUl.lastChild);
    }
}


renderProducts(products);

//search for a product
const searchInput = document.getElementById("productSearch");
searchInput.addEventListener("keyup", function () {
    let searchText = searchInput.value.toLowerCase();
    console.log(searchText);
    let searchProducts = products.filter(item => item.name.toLowerCase().includes(searchText))
    console.log(searchProducts);
    unrenderProducts();
    renderProducts(searchProducts);
})

//search for max price
const maxPriceInput = document.getElementById("maxPrice");
maxPriceInput.addEventListener("keyup", function () {
    let searchPrice = maxPriceInput.value
    if (searchPrice !== "") {
        let filterPrice = products.filter(item => item.price <= searchPrice);
        console.log(filterPrice);
        unrenderProducts();
        renderProducts(filterPrice);
    } else {
        unrenderProducts();
        renderProducts(products)
    }
})

//sort products

const selectButton = document.getElementById("sortItems");
selectButton.addEventListener("change", function () {
    let userSelect = selectButton.value
    let sortedProducts = products.sort(function (a, b) {
        let value1 = a[userSelect]
        let value2 = b[userSelect]
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0
        }
    })
    unrenderProducts();
    renderProducts(sortedProducts);
})

//currency

const currency = document.getElementById("currency");
currency.addEventListener("change", function () {
    let userSelect = currency.value
    let myProducts = copyArray(products);
    myProducts.map(item => {
        let itemPrice = item.price;
        if (userSelect === "eur") {
            item.price = Math.round(item.price * 0.13);
        } else if (userSelect === "dollar") {
            item.price = Math.round(item.price * 0.16);
        } else {
            item.price
        }
        return item
    })
    unrenderProducts();
    renderProducts(myProducts);
})

//copy products array

function copyArray(array) {
    let newArray = array.map(item => {
        return Object.assign({}, item)
    })
    return newArray;
}




