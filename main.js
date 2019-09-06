const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});


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
   // console.log(data);
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
    //console.log(dish)

    const template = document.querySelector("template").content;
    const myCopy = template.cloneNode("true");
    myCopy.querySelector(".image img").src = "images/large/" + dish.image + ".jpg";

    myCopy.querySelector(".name h1").textContent = dish.name;
    myCopy.querySelector(".price p").textContent = `Price:${dish.price}`



    if (dish.discount) {
        myCopy.querySelector(".price p").classList.add("discount");
        myCopy.querySelector(".dis p").textContent = `New price: ${Math.round(dish.price - dish.discount / 100 * dish.price)}`

    } else {
        myCopy.querySelector(".dis p").remove();
    }
    if (dish.soldout == true) {
        myCopy.querySelector(".soldout").classList.add("sold");
    }else {
       //do nothing
    }
    myCopy.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
    document.querySelector(`#${dish.category}`).appendChild(myCopy);


}

function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector("img").src = "images/large/" + data.image + ".jpg";
    modal.querySelector(".modal-price").textContent = `Price: ${Math.round(data.price - data.discount / 100 * data.price)}`;
modal.querySelector(".modal-alcohol").style.display = "block";
    if (data.alcohol > 0) {
        modal.querySelector(".modal-alcohol").textContent = `Alcohol : ${data.alcohol}%`;
        modal.querySelector(".modal-alcohol").style.display = "block";
    } else {
        modal.querySelector(".modal-alcohol").style.display = "none";
    }
    modal.querySelector(".modal-vegetarian").style.display = "block";
    if (data.vegetarian == true) {
        modal.querySelector(".modal-vegetarian").textContent = `Vegetarian`;
        modal.querySelector(".modal-vegetarian").style.display = "block";
    } else {
        modal.querySelector(".modal-vegetarian").style.display = "none";
    }

    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.classList.remove("hide");
     if (data.soldout == true) {
        //modal.querySelector("button#order").classList.add("sold");
        modal.querySelector("button#order").remove();
         //modal.querySelector("button#order").remove(function orderMessage());

    }else {
       //do nothing
    }
}

//for moving to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//const button = document.querySelector("button");
//button.addEventListener("click", addCopy);

/*
function addCopy() {
    const myTemplate = document.querySelector("template").content;
    const myCopy = myTemplate.cloneNode(true);
    const main = document.querySelector("aside");
    aside.appendChild(myCopy)
}
*/

//ordered message
function orderMessage() {
    alert("You have successfully placed your order!");
}
