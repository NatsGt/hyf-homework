//Global variables
const myProducts = document.querySelector(".product-list")
const myGreeting = document.getElementById("welcome")
const myProductSpec = document.querySelector(".one-product")
const mySelector = document.getElementById("currency");
const productDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nulla turpis, efficitur eget pharetra sit amet, tristique eget erat. Nulla semper, diam non suscipit ornare, purus diam varius mi, et finibus metus justo quis tellus. Curabitur a semper lacus, eu consectetur mi. Nunc vehicula mattis suscipit. Fusce massa dui, dictum sed semper quis, auctor ut orci. Nunc ut consequat sem. Etiam porttitor, ex quis volutpat mattis, nisl odio molestie sem, sit amet rhoncus mi lacus in est."

//Functions
function insertElement(element, text, parent, className) {
    const item = document.createElement(element);
    item.innerHTML = text;
    item.classList = className
    parent.appendChild(item);
}

function insertImage(src, parent, className) {
    const image = document.createElement("img");
    image.src = src
    image.classList = className
    parent.appendChild(image);
}

function getImage(search) {
    return fetch(`https://api.pexels.com/v1/search?query=${search}`, {
        headers: {
            Authorization: "563492ad6f91700001000001f2df285016c84cff8feb68d8c8432e75"
        }
    })
        .then(resp => {
            return resp.json()
        })
}

function eraseProducts(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function createProductsElements(products, currency) {
    const myUl = document.createElement("ul");
    if (currency === "DKK") {
        products.forEach(product => {
            insertElement("li", product.name, myUl, "product-name");
            insertElement("li", `${product.price} ${currency}`, myUl, "product-price")
        })
        const total = products.reduce((a, b) => parseFloat(a) + parseFloat(b.price), 0);
        insertElement("li", `${total} ${currency}`, myUl, "total");
    } else {
        products.forEach(product => {
            product.convertToCurrency(currency).then(price => {
                insertElement("li", product.name, myUl, "product-name");
                insertElement("li", `${price} ${currency}`, myUl, "product-price")
            })
        })
        let totalConverted = products.map(product => product.convertToCurrency(currency))
        totalConverted = Promise.all(totalConverted).then(values => values.reduce((a, b) => parseFloat(a) + parseFloat(b))).then(total => insertElement("li", `${total.toFixed(2)} ${currency}`, myUl, "total"))
    }
    myProducts.appendChild(myUl);
}

async function createProductSpec(product) {
    insertElement("h4", product.name, myProductSpec, "one-product-name")
    insertElement("p", productDescription, myProductSpec, "product-description")
    const url = await getImage(product.name).then(data => data.photos[0].src.small)
    insertImage(url, myProductSpec, "product-img")
    insertElement("p", product.price + " kr", myProductSpec, "one-product-price")
}

function displaySearch(arr, search, parent, input) {
    arr.forEach(product => {
        if (product.substr(0, search.length).toLowerCase() == search.toLowerCase()) {
            const oneInput = document.createElement("div");
            oneInput.innerHTML = "<strong>" + product.substr(0, search.length) + "</strong>";
            oneInput.innerHTML += product.substr(search.length);
            oneInput.addEventListener("click", function (e) {
                input.value = product;
                shoppingCart.renderOneProduct(product)
                closeSearchList();
            });
            parent.appendChild(oneInput);
        }
    })
}

function closeSearchList() {
    const allInputs = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < allInputs.length; i++) {
        eraseProducts(allInputs[i])
    }
}

//Classes

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    convertToCurrency(currency) {
        return fetch("https://api.exchangeratesapi.io/latest?base=DKK")
            .then(res => res.json())
            .then(data => {
                const changePrice = this.price * data.rates[currency];
                return changePrice.toFixed(2);
            });
    }

}

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product)
    }

    removeProduct(product) {
        this.products = this.products.filter(item => item.name !== product.name)
    }

    searchProduct(productName) {
        const product = this.products.filter(item => item.name === productName)
        return product;
    }

    getTotal() {
        let iValue = 0;
        const sum = this.products.reduce((acc, current) => acc + current.price, iValue)
        return sum
    }

    renderProducts(currency = "DKK") {
        eraseProducts(myProducts);
        createProductsElements(this.products, currency);
    }

    renderOneProduct(productName) {
        eraseProducts(myProductSpec);
        let oneProduct = this.searchProduct(productName);
        oneProduct = oneProduct[0];
        createProductSpec(oneProduct);
    }

    getUser() {
        return fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(res => res.json()).then(client => insertElement("h3", client.name, myGreeting, "user"))
    }

}


//Tests
const shoppingCart = new ShoppingCart();
const flatscreen = new Product("flat-screen", 5000);
const radio = new Product("radio", 500);
const speakers = new Product("speakers", 300);
const computer = new Product("computer", 7000);
const blender = new Product("blender", 900);
const monitor = new Product("computer-monitor", 1000);

shoppingCart.addProduct(flatscreen);
shoppingCart.addProduct(radio);
shoppingCart.addProduct(speakers);
shoppingCart.addProduct(computer);
shoppingCart.addProduct(blender);
shoppingCart.addProduct(monitor);
console.log(shoppingCart);

shoppingCart.removeProduct(radio);
console.log(shoppingCart);

shoppingCart.renderProducts()

const search = shoppingCart.searchProduct("speakers");
console.log(search);
shoppingCart.getUser()
const total = shoppingCart.getTotal();
console.log(total);

const plant = new Product("plant", 50);
const priceDollar = plant.convertToCurrency("USD").then(data => console.log(data))


//Autocomplete input
const autocompleteOptions = shoppingCart.products.map(item => item.name);
console.log(autocompleteOptions);

var options = autocompleteOptions;
function autocomplete(inp, arr) {
    inp.addEventListener("input", function (e) {
        closeSearchList();
        const searchInput = this.value;
        if (!searchInput) { return }
        insertElement("div", "", this.parentNode, "autocomplete-items")
        const allInputs = document.querySelector(".autocomplete-items")
        displaySearch(arr, searchInput, allInputs, inp)
    });

    document.addEventListener("click", function (e) {
        closeSearchList();
    });
}

autocomplete(document.getElementById("searchProduct"), options);

/*CURRENCIES RENDER*/
mySelector.addEventListener("change", () => {
    const myCurrency = mySelector.value;
    shoppingCart.renderProducts(myCurrency)
})

