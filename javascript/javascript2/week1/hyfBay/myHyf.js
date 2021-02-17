console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

function renderProducts(products) {
    products.forEach(product => {
        let myProduct = document.createElement("li");
        let myPrice = document.createElement("li");
        let myRating = document.createElement("li");
        let myUl = document.querySelector(".my-ul");
        myProduct.innerHTML = "<h2>" + product.name + "</h2>";
        myUl.appendChild(myProduct);
        myPrice.innerHTML = "Price: " + product.price;
        myUl.appendChild(myPrice);
        myRating.innerHTML = "Rating: " + product.rating;
        myUl.appendChild(myRating);
    });
}

renderProducts(products);