console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

function renderProducts(products) {
    products.forEach(product => {
        let myProduct = document.createElement("li");
        let myPrice = document.createElement("li");
        let myRating = document.createElement("li");
        myProduct.innerHTML = "<h2>" + product.name + "</h2>";
        document.querySelector(".my-ul").appendChild(myProduct);
        myPrice.innerHTML = "Price: " + product.price;
        document.querySelector(".my-ul").appendChild(myPrice);
        myRating.innerHTML = "Rating: " + product.rating;
        document.querySelector(".my-ul").appendChild(myRating);
    });
}

renderProducts(products);