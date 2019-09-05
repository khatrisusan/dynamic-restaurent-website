fetch("http://kea-alt-del.dk/t5/api/categories")
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        data.forEach(buildCategory);
        getProducts();
    })

function buildCategory(data) {
    //	console.log(data)
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent = data;
    section.setAttribute("id", data);
    section.appendChild(header);

    document.querySelector("main").appendChild(section);
    console.log(data);
}

function getProducts() {

    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            data.forEach(showDish)
        })

}

function showDish(dish) {
    console.log(dish)

    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode("true");
    myCopy.querySelector(".image img").src = "images/large/" + dish.image + ".jpg";

    myCopy.querySelector(".name h1").textContent = dish.name;
    myCopy.querySelector(".price p").textContent = `Price:${dish.price}`
    if (!dish.alcohol == 0) {
        myCopy.querySelector(".alcohol p").textContent = `Alcohol:${dish.alcohol}`;
    } else {
        myCopy.querySelector(".alcohol p").remove();
    }



    if (dish.discount) {
        myCopy.querySelector(".price p").classList.add("discount");
        myCopy.querySelector(".discount p").textContent = Math.round(dish.price - dish.discount / 100 * dish.price)

    } else {
        myCopy.querySelector(".discount p").remove();
    }

    if (dish.soldout == false) {
        myCopy.querySelector(".soldout").classList.remove("soldOut");
    }
    document.querySelector(`#${dish.category}`).appendChild(myCopy)
}



//const button = document.querySelector("button");
//button.addEventListener("click", addCopy);

function addCopy() {
    const myTemplate = document.querySelector("template").content;
    const myCopy = myTemplate.cloneNode(true);
    const main = document.querySelector("aside");
    aside.appendChild(myCopy)
}
