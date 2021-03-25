//Global variables
const myProducts = document.querySelector(".product-list")
const myGreeting = document.getElementById("welcome")
const myProductSpec = document.querySelector(".one-product")
const mySelector = document.getElementById("currency");
const productDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nulla turpis, efficitur eget pharetra sit amet, tristique eget erat. Nulla semper, diam non suscipit ornare, purus diam varius mi, et finibus metus justo quis tellus. Curabitur a semper lacus, eu consectetur mi. Nunc vehicula mattis suscipit. Fusce massa dui, dictum sed semper quis, auctor ut orci. Nunc ut consequat sem. Etiam porttitor, ex quis volutpat mattis, nisl odio molestie sem, sit amet rhoncus mi lacus in est."

//Functions
function insertProduct(element, text, parent, className) {
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

    renderProducts(client, currency = " kr") {
        //Container
        const myUl = document.createElement("ul");
        //Client
        insertProduct("h3", client.name, myGreeting, "user");
        //Products
        this.products.forEach(product => {
            insertProduct("li", product.name, myUl, "product-name");
            insertProduct("li", product.price + currency, myUl, "product-price");
        })
        //Total
        const total = this.getTotal();
        insertProduct("li", total + currency, myUl, "total");
        //Insert into container
        myProducts.appendChild(myUl);
    }

    async renderOneProduct(productName) {
        eraseProducts(myProductSpec)
        let oneProduct = this.searchProduct(productName)
        oneProduct = oneProduct[0]
        insertProduct("h4", oneProduct.name, myProductSpec, "one-product-name")
        insertProduct("p", productDescription, myProductSpec, "product-description")
        const url = await getImage(productName).then(data => data.photos[0].src.small)
        insertImage(url, myProductSpec, "product-img")
        insertProduct("p", oneProduct.price + " kr", myProductSpec, "one-product-price")

    }

    getUser() {
        return fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(res => res.json())
    }

    renderAllConverted(currency) {
        //erase previous data
        eraseProducts(myProducts)
        //container
        const myUl = document.createElement("ul");
        //convert prices of shopping cart
        this.products.forEach(product => {
            product.convertToCurrency(currency).then(price => {
                insertProduct("li", product.name, myUl, "product-name");
                insertProduct("li", `${price} ${currency}`, myUl, "product-price")
            })
        })
        //get total of converted prices
        let totalConverted = this.products.map(product => product.convertToCurrency(currency))
        totalConverted = Promise.all(totalConverted).then(values => values.reduce((a, b) => parseFloat(a) + parseFloat(b))).then(total => insertProduct("li", `${total.toFixed(2)} ${currency}`, myUl, "total"))
        //append everything
        myProducts.appendChild(myUl);
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

const search = shoppingCart.searchProduct("speakers");
console.log(search);
shoppingCart.getUser().then(client => shoppingCart.renderProducts(client))
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
        const searchInput = this.value;
        closeAllLists();
        if (!searchInput) { return false; }
        const allInputs = document.createElement("div");
        allInputs.setAttribute("id", this.id + "autocomplete-list");
        allInputs.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(allInputs);
        arr.forEach(product => {
            if (product.substr(0, searchInput.length).toLowerCase() == searchInput.toLowerCase()) {
                const oneInput = document.createElement("div");
                oneInput.innerHTML = "<strong>" + product.substr(0, searchInput.length) + "</strong>";
                oneInput.innerHTML += product.substr(searchInput.length);
                const searchValue = product;
                oneInput.addEventListener("click", function (e) {
                    inp.value = searchValue;
                    shoppingCart.renderOneProduct(searchValue)
                    closeAllLists();
                });
                allInputs.appendChild(oneInput);
            }
        })
    });
    function closeAllLists() {
        const allInputs = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < allInputs.length; i++) {
            eraseProducts(allInputs[i])
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists();
    });
}

autocomplete(document.getElementById("myInput"), options);

/*CURRENCIES RENDER*/
mySelector.addEventListener("change", () => {
    const myCurrency = mySelector.value;
    shoppingCart.renderAllConverted(myCurrency)
})

