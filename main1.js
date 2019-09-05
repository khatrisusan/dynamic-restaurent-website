fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        data.forEach(showDish)
    })

function showDish(dish) {
    console.log(dish)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name h1").textContent = dish.name;
    document.querySelector(".products").appendChild(copy);
    copy.querySelector(".price p").textContent = dish.price;
    document.querySelector("main.products.price").appendChild(copy);
}
