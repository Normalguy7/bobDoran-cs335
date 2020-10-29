function myHome() {
    var home = "";
    home +=
        "<div style='display: block'>" +
        "<p>You can learn more about the displays here. If you are intrigued by what you find here and live close to Auckland, or are visiting the city, please feel free to drop in to the school and see the displays for yourself. We are located at the University on Princes Street and are always open during normal office hours and also in the evenings and on the weekends when classes are in session.</p>" +
        "<img src='https://upload.wikimedia.org/wikipedia/commons/7/77/University_of_Auckland_Clock_Tower_building_from_front.JPG' alt='mainimage' width=500px></div>";
        document.getElementById("title").innerHTML = "<h1>Home</h1> <br>"
        document.getElementById("home").innerHTML = home;
        document.getElementById("bar").innerHTML = ""

}
var online = false;

function getDisplay() {
    const url = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        document.getElementById("bar").innerHTML =
            "<input id='search' type='text' onkeyup='search()' placeholder='Search..'> <br><hr>";
        const resp = JSON.parse(xhr.responseText);
        setDisplay(resp);
    };
    xhr.send();
}
var itemId = "";



function search() {
    let searchbar = document.getElementById("search").value;

    const xhr = new XMLHttpRequest();
    const url =
        "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" +
        searchbar;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        setDisplay(resp);
    };
    xhr.send();
}

function setDisplay(resp) {
    let content = "";
    for (let item of resp) {

        content +=
            "<div><img  class='display-image' src='http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" +
            item.ItemId +
            "'></div>" + 
            "<div class='item'><div><h3>" +
            item.Title +
            "</h3><div class='desc'>" +
            item.Description +
            "</div>" + 
            "</div>" + "</div> <br> <hr>";
    }
    document.getElementById("title").innerHTML = "<h1>Displays</h1> <br>"
    document.getElementById("home").innerHTML = content;

}

function myNews() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        document.getElementById("home").innerHTML = "";
        const resp = JSON.parse(xhr.responseText);
        seeNews(resp);
    };
    xhr.send();
}

function seeNews(resp) {
    let news = "";
    for (let item of resp) {
        news +=
            "<div><img  class='display-image' src='" +
            item.enclosureField.urlField +
            "'></div><br> <div class='item'><div><div class='date'>" +
            item.pubDateField +
            "</div><div class='title'><a href='" +
            item.linkField +
            "'>" +
            item.titleField +
            "</a></div><div class='desc'>" +
            item.descriptionField +
            "</div></div></div> <br><hr>";
    }
    document.getElementById("title").innerHTML = "<h1>News</h1> <br><hr>"
    document.getElementById("home").innerHTML = news;
    document.getElementById("bar").innerHTML = ""

}

function inputComment() {
    const xhr = new XMLHttpRequest();
    const url =
        "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments";
    xhr.open("GET", url, true);
    xhr.onload = () => {
        let comment =
            "<div><textarea id='comment-input' placeholder='Comment here'></textarea><input type='text' id='name-input' placeholder='Your Name'><input id='submit' type='submit' onclick='comments()'></div><br>";
        let content =
            "<div id=comment><span>Recent Comments</span>" +
            xhr.responseText +
            "</div>";
        document.getElementById("title").innerHTML = "<h1>Comments</h1> <br>"
        document.getElementById("home").innerHTML = comment + content;

    };
    xhr.send();
}

function comments() {
    const comments = document.getElementById("comment-input").value;
    const names = document.getElementById("name-input").value;
    const xhr = new XMLHttpRequest();
    const url =
        "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" +
        names;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        inputComment();
    };
    xhr.send(JSON.stringify(comments));
}

function loginScreen() {
    document.getElementById("title").innerHTML = "<h2 class='active'>Sign In<h2>"
    document.getElementById("home").innerHTML = "<form><input id ='uname' placeholder='enter username' required><br><input type='passsword' input id ='pass' placeholder='enter password' required><br></form>" + 
    "<button onClick='loginSend()'>Login</button>"
    document.getElementById("bar").innerHTML = ""


}

function loginSend() {
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;
    if (uname != "" || pass != "") {
        const xhr = new XMLHttpRequest();
        const url = "";
        xhr.open ("GET", url, true, user, pass);
        xhr.withCredentials = true;
        xhr.onload = () => {
            if (itemId == ""){
                purchase(itemId);
            }
            else if (xhr.status == 200) {
                online = true;
                if (itemId != "") {
                    let product = 'buy("' + itemId + '")';
                    document.getElementById("home").innerHTML = ""
                }
                else {
                    document.getElementById("home").innerHTML = ""
                }
                document.getElementById("").innerHTML = ""
            }
            else {
                document.getElementById("home").innerHTML = ""
            }
        }
        xhr.send();
    }
    else {
        document.getElementById("home").innerHTML = ""
    }
}


function registerScreen() {
    document.getElementById("title").innerHTML = "<h2 class='active'>Register<h2>"
    document.getElementById("home").innerHTML = "<form><input id ='uname' placeholder='enter username' required><br><input type='passsword' input id ='pass' placeholder='enter password' required><br><input id='address' placeholder = 'enter address'></form>" + 
    "<button onClick='Registration()'>Register</button>"
    document.getElementById("bar").innerHTML = ""

}

function Registration() {
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;
    let address = document.getElementById("address").value;
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8188/MuseumService.svc/register"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        const x = JSON.parse(xhr.responseText);
        console.log(x);
        document.getElementById("home").innerHTML = ""
    }
    sendRegisterDetails = {
        "username": uname,
        "Address": address,
        "password": pass,
    }
    xhr.send(JSON.stringify(sendRegisterDetails));
}


function Shop() {
    document.getElementById("title").innerHTML = "<h1>Store</h1> <br>"
    document.getElementById("bar").innerHTML =
    "<input id='search' type='text' onkeyup='searchShop()' placeholder='Search..'> <br><hr>";
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8188/MuseumService.svc/shop?term=";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const shop = JSON.parse(xhr.responseText);
        setShop(shop);
    }
    xhr.send();

}

function setShop(shop) {
    let items = "";
    for (let item of shop) {
        let product = 'buy("' + item.ItemId + '")';
        items += "<div class='item'><div><div class='display-title'>" 
        + item.Title + "</div><div class='desc'>" 
        + item.Description + "</div><button class='buy' onclick='" 
        + id + "'>Buy Now</button></div><div class='image'><img src='http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" 
        + item.ItemId + "'></div></div>";
    }
    document.getElementById("home").innerHTML = items;
}