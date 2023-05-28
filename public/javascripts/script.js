// url = "http://localhost:3000";

//const id = require("faker/lib/locales/id_ID");

function getArticles(take = 20, skip = 0) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/articles?take=${take}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// // Function to get categories
function getCategories() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// function getArticlegategorie() {
//   return new Promise((resolve, reject) => {
//     fetch(`http://localhost:3000/`)
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
// }
// //function to get all users
// function getUsers() {
//   return new Promise((resolve, reject) => {
//     fetch(`${url}/users`)
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
// }
// // Function to get user by ID
// function getUserById(id) {
//   return new Promise((resolve, reject) => {
//     fetch(`${url}/users/${id}`)
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
// }
// // Function to create an article
// function createArticle(articleData) {
//   return new Promise((resolve, reject) => {
//     fetch(`${url}/articles`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(articleData),
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
// }

// btn.onclick = function () {
//   getComments();
// };

var content = document.getElementById("content");
var homeButton = document.getElementById("navHome");
var signupButton = document.getElementById("navSignup");
var loginButton = document.getElementById("navLogin");
var logoutButton = document.getElementById("navLogout");
var explorebutton = document.getElementById("explore");
var addbutton = document.getElementById("addArticle");
var userDropdown = document.getElementById("user-dropdown");

function getAuthUser() {
  const user = JSON.parse(window.localStorage.getItem("auth_user"));
  return user || null;
}
function signup(event) {
  event.preventDefault();
  // get the email and password from input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  var url = `http://localhost:3000/userArt/signup`; //still have to change this depending on the user logged in
  var choice;
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        choice = 1;
        return response.json();
      } else {
        choice = 2;
      }
    })
    .then((data) => {
      console.log(data);
      content.innerHTML = "";
      if (choice == 1) {
        content.innerHTML = `
      <h2> successfull sign up  monsieur/madame : ${name} avec l'id : ${data.newUser.id}</h2>
 <img src = "./images/blog/successfull signup.png" 
 style ="max-width: 80%; max-height: 80vh;object-fit: contain;display: flex;justify-content: center;align-items: center;margin:auto;">`;
      } else {
        content.innerHTML = `<img src="./images/blog/400 Error Bad Request-rafiki.png"
        style ="max-width: 80%; max-height: 80vh;object-fit: contain;display: flex;justify-content: center;align-items: center;margin:auto;">`;
      }
    });
}

function profile() {
  var choice;
  var username = document.getElementById("email").value; //stored value of name user in variable username
  var password = document.getElementById("password").value; // stored value of password in variable password

  var url = `http://localhost:3000/userArt/login`; //still have to change this depending on the user logged in

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status == 200) {
        choice = 1;
        return response.json();
      } else {
        choice = 2;
      }
    })
    .then((data) => {
      content.innerHTML = "";
      if (choice == 1) {
        window.localStorage.setItem("auth_token", data.token);
        window.localStorage.setItem("auth_user", JSON.stringify(data.user));

        welcomeUser();

        logoutButton.style.display = "flex";
        loginButton.style.display = "none";
        homeButton.style.display = "none";
        signupButton.style.display = "none";
        addbutton.style.display = "flex";
      } else {
        content.innerHTML = `<img src="./images/blog/401 Error Unauthorized-rafiki.png"
        style ="max-width: 80%; max-height: 80vh;object-fit: contain;display: flex;justify-content: center;align-items: center;margin:auto;">`;
      }
    });
}

function addArticle() {
  var title = document.getElementById("article-title").value;
  var content = document.getElementById("article-content").value;

  console.log(title, content);

  var url = `http://localhost:3000/articles`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      titre: title,
      contenue: content,
      image: "https://loremflickr.com/640/480?lock=4229112191254528",
      published: true,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("auth_token"),
    },
  }).then((response) => {
    if (response.status == 200) {
      changeContent("explore");
    } else {
      let wrongPswd = document.createElement("img");
      wrongPswd.setAttribute(
        "src",
        "./images/blogs/401 Error Unauthorized-rafiki.png"
      );
      wrongPswd.style =
        "max-width: 100%; max-height: 100vh;object-fit: contain;display: flex;justify-content: center;align-items: center;margin:auto;";
      content.appendChild(wrongPswd);
    }
  });
}

function welcomeUser() {
  const user = getAuthUser();
  const isAuth = user !== null;

  const navButtons = document.getElementById("navButtons");
  const userDropdown = document.getElementById("user-dropdown");
  const usernameContainer = userDropdown.querySelector(".username");

  if (isAuth) {
    // navButtons.style.display = "none";
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    homeButton.style.display = "none";
    userDropdown.style.display = "flex";
    usernameContainer.innerHTML = `Welcome ${user.name}`;
    changeContent("explore");
    logoutButton.style.display = "flex";
  } else {
    navButtons.style.display = "flex";
    userDropdown.style.display = "none";
  }
}

async function changeContent(page, articleid) {
  // Clear the existing content
  content.innerHTML = "";
  // Create the new content based on the selected page
  if (page === "home") {
    content.innerHTML = `
<div id="content" style="padding: 10px;">
    <div class="container-fluid" id="description" style="display: flex;justify-content: space-around;">
      <img class="col-md-5" src="./images/blog/BlogVD.png" alt="BLOG!!">
      <div class="col-md-5" style="margin: 140px auto;">
      <h1 style="font-family: Arial;color: #022f73;font-size: 100px;">Blogging</h1>
      <b>
          <p style="margin: 20px 3px;width: 500px;color:black; text-align: center;">
              the platform where passion meets the power of words, shaping a world of
              connections and shared experiences<br><span
                  style="color: #000000; align-items: center;"> BLOG
                  ^-^ </span></p>
      </b>
      </div>
    </div>
  </div>
  <div>
  <div id="navButtons" style="display: flex;justify-content:end;align-items: center;">
      <button id="navHome" onclick="changeContent('home');console.log('clicked')"
          style="border: none; background: none; color: white; font-size: 15px; margin: auto 20px; font-family:  Arial, Helvetica, sans-serif; display: flex;">Home
      </button>
      <button id="navSignup" onclick="changeContent('signup')"
          style="border: none; background: none; color: white; font-size: 15px; margin: auto 10px; font-family:Arial, Helvetica, sans-serif; display: flex;">SignUp
      </button><button id="navLogin" onclick="changeContent('login')"
          style="border: none; background: none; color: white; font-size: 15px; margin: auto 10px; font-family:  Arial, Helvetica, sans-serif; display: flex;">Login
      </button><button id="navLogout" onclick="changeContent('home')"
          style="border: none;background: none;color: white;font-size: 15px;margin: auto 10px;font-family: HK Grotesk;display: none;">Logout
      </button>
  </div>

</div>
`;
    logoutButton.style.display = "none";
    loginButton.style.display = "flex";
    homeButton.style.display = "flex";
    signupButton.style.display = "flex";
    explorebutton.style.display = "flex";
    userDropdown.style.display = "none";
  } else if (page === "login") {
    content.innerHTML = `
  <div class="container-fluid" style="display: flex;justify-content: space-around;">
  <img src="./images/blog/Tablet login-rafiki.png" alt="blog" class="col-md-5" style="height:auto;">
  <form class="col-6 g-3 needs-validation" id="registrationForm" style="margin:10% auto;display: flex;align-items: center;flex-direction: column;background-color:  #407bff; ;height: 215px;width:30%;padding: 2% 0;border-radius: 20px;" novalidate method="post">
      <div class="col-md-5" style="width: 90%;">
        <label for="email" class="form-label" style="font-family: Arial ;color :Black;">Email</label>
        <div class="input-group has-validation">
          <input type="email" class="form-control" id="email" aria-describedby="inputGroupPrepend" required>
          <div class="invalid-feedback">
            Please note your mail address.
          </div>
        </div>
      </div>
      <div class="col-md-5" style="width: 90%;">
          <label for="password" class="form-label" style="font-family: Arial ;:Black;">Password</label>
          <div class="input-group has-validation">
            <input type="password" class="form-control password-input" id="password" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
              Please choose a email.
            </div>
          </div>
      </div>
      <div class="col-md-5" style="width: 60%;display:flex;justify-content: center;margin: 17%;">
      <button onclick="profile()" class="btn" type="button" style="background-color:rgb(78, 78, 106); color:Black; height:100%;">Login</button>
      </div>
    </form>
  </div>
  `;

    logoutButton.style.display = "none";
    loginButton.style.display = "none";
    homeButton.style.display = "flex";
    signupButton.style.display = "none";
    document
      .getElementById("registrationForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
      });
  } else if (page === "signup") {
    content.innerHTML = `<div class="container-fluid" style="display: flex;justify-content: space-around;">
    <img src="./images/blog/Mobile login-rafiki.png" alt="blog" class="col-md-5" style="height:auto;">
    <form action="http://localhost:3000/users" method="post" id="registrationForm" class="col-6 g-3 needs-validation" style="margin:10% auto;display: flex;align-items: center;flex-direction: column;background-color:  #407bff; ;height: 300px;width:30%;padding: 3% 0;border-radius: 20px;" novalidate method="post">
    <div class="col-md-5" style="width: 90%;">
          <label for="name" class="form-label" style="font-family: Arial ;color:Black;">Name</label>
<input name="name" type="text" class="form-control" id="name" required>
<div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-5" style="width: 90%;">
    <label for="email" class="form-label" style="font-family: Arial ;color :Black;">Email</label>
          <div class="input-group has-validation">
            <input name="email" type="email" class="form-control" id="email" aria-describedby="inputGroupPrepend" required>
            <div class="invalid-feedback">
              Please type your mail address.
            </div>
          </div>
        </div>

        <div class="col-md-5" style="width: 90%;">
        <label for="password" class="form-label" style="font-family: Arial ;color:Black;">Password</label>
                <div class="input-group has-validation">
                  <input name="password" type="password" class="form-control" id="password" aria-describedby="inputGroupPrepend" required>
                  <div class="invalid-feedback">
                    Please choose a password.
                  </div>
                </div>
            </div>
            <div class="col-md-5" style="width: 90%; margin: 5px;"> <!-- Admin or author -->
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="role" id="admin" value="ADMIN">
                  <label class="form-check-label" for="admin" style="font-family: Arial ;color:Black;">Admin</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="role" id="author" value="AUTHOR">
                  <label class="form-check-label" for="author" style="font-family: Arial ;color:Black;">Author</label>
                </div>
              </div>
                 <div class="col-md-5" style="width: 60%;display:flex;justify-content: center;margin: 10%;">
                 <button onclick="signup(event)" class="btn"  style="background-color:rgb(78, 78, 106); color:black;">Sign Up</button>
                 </div>
        </form>
    </div>
    `;
    logoutButton.style.display = "none";
    loginButton.style.display = "flex";
    homeButton.style.display = "flex";
    signupButton.style.display = "flex";
  } else if (page === "add-article") {
    content.innerHTML = `
    <div class="container-fluid">
    <form class="g-3 needs-validation" id="registrationForm" style="margin:10% auto;display: flex;align-items: center;flex-direction: column;background-color:  #407bff; ;height: 215px;width:30%;padding: 2% 0;border-radius: 20px;" novalidate method="post">
        <div class="col-md-5" style="width: 90%;">
          <label for="title" class="form-label" style="font-family: Arial ;color :Black;">Title</label>
          <div class="input-group has-validation">
            <input type="text" class="form-control" id="article-title" required>
          </div>
        </div>
        <div class="col-md-5" style="width: 90%;">
            <label for="content" class="form-label" style="font-family: Arial ;:Black;">Content</label>
            <div class="input-group has-validation">
              <textarea  class="form-control" id="article-content" required></textarea>
            </div>
        </div>
        <div class="col-md-5" style="width: 60%;display:flex;justify-content: center;margin: 17%;">
        <button onclick="addArticle()" class="btn" type="button" style="background-color:rgb(78, 78, 106); color:Black; height:100%;">Add Article</button>
        </div>
      </form>
    </div>
    `;
  } else if (page === "explore") {
    // const countartcatg = await getArticlegategorie();
    const categories = await getCategories();
    const articles = await getArticles();
    const user = getAuthUser();
    html = "";
    categories.forEach((categorie) => {
      html += `<p style="background-color: #E6E6FA; width: 200px; border-radius: 8px; padding: 10px; color: #333; font-family: 'Georgia', serif; text-align: center; display: inline-block; margin-right: 10px; align-items : center">${categorie.nom}</p>`;
    });
    html += `<br> <br> <div style = " display : flex ; flex-wrap : wrap ; justify-content : space-evenly ;  align-items : center ; width : 100%"> `;
    articles.forEach((article) => {
      html += `
        <article class="mb-4 border "  style =   "display : flex ;width : fit-content; flex-direction : column; align-items:start ; justify-content: space-evenly ; margin : auto ; border-radius : 20px ; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; padding-bottom: 10px">
        <img src="${article.image}" class="img-fluid" style="max-height: 280px; width: 100%; object-fit: contain; border-radius : 20px " />
        <h2 onclick="readArticle(${article.id})" style="padding : 0 10px">le Titre : ${article.titre}</h2>
            <button onclick="changeContent('read',${article.id})" style = "background-color: #553a7d;
            font-weight: bold;  
            color: #fff;
            padding: 0 10px;
            margin: 0 10px; border-radius : 8px" onclick=changeContent('read')" >Read more... </button>`;
      if (user != null && user.id == article.userId) {
        html += `<h6> les articles de l'user qui l'id : ${user.id}</h6>`;
      }
      html += `</article>`;
    });
    html += "</div>";

    content.innerHTML = html;
  } else if (page === "logout") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    content.innerHTML = `
    <div>
    <div id="navButtons" style="display: flex;justify-content:end;align-items: center;">
        <button id="navHome" onclick="changeContent('home');console.log('clicked')"
            style="border: none; background: none; color: white; font-size: 15px; margin: auto 20px; font-family:  Arial, Helvetica, sans-serif; display: flex;">Home
        </button><button id="navSignup" onclick="changeContent('signup')"
            style="border: none; background: none; color: white; font-size: 15px; margin: auto 10px; font-family:Arial, Helvetica, sans-serif; display: flex;">SignUp
        </button><button id="navLogin" onclick="changeContent('login')"
            style="border: none; background: none; color: white; font-size: 15px; margin: auto 10px; font-family:  Arial, Helvetica, sans-serif; display: flex;">Login
        </button><button id="navLogout" onclick="changeContent('home')"
            style="border: none;background: none;color: white;font-size: 15px;margin: auto 10px;font-family: HK Grotesk;display: none;">Logout
        </button>
    </div>
<div id="content" style="padding: 10px;">
    <div class="container-fluid" id="description" style="display: flex;justify-content: space-around;">
    <img class="col-md-5" src="./images/blog/BlogVD.png" alt="BLOG!!">
    <div class="col-md-5" style="margin: 140px auto;">
    <h1 style="font-family: Arial;color: #022f73;font-size: 100px;">Blogging</h1>
    <b>
        <p style="margin: 20px 3px;width: 500px;color:black; text-align: center;">
            the platform where passion meets the power of words, shaping a world of
            connections and shared experiences<br><span
                style="color: #000000; align-items: center;"> BLOG
                ^-^ </span></p>
    </b>
      </div>
    </div>
  </div>`;
    logoutButton.style.display = "none";
    loginButton.style.display = "flex";
    homeButton.style.display = "flex";
    signupButton.style.display = "flex";
    addbutton.style.display = "none";
    userDropdown.style.display = "none";
  } else if ((page === "read", articleid)) {
    const article = await getArticlebyId(articleid);
    const comments = article.Commentaire;
    // console.log(article);
    const categories = await article.Categorie;

    content.innerHTML = "";
    content.innerHTML = `
    <article class="mb-4 p-2" style="background-color: #FFF;  border-radius: 8px; font-family: Arial, Helvetica, sans-serif; width: 70%; margin: auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);">
    <h1 style="color: black; font-weight: bold; font-size: 60px; padding: 40px 4px;">${article.titre}</h1>
    <img src="${article.image}" class="img-fluid" style="height: 500px; width: 100%; object-fit: contain; border-radius: 8px; margin-bottom: 10px;">
    <h6 style="font-family: Arial, Helvetica, sans-serif; color: #333; font-weight: bolder; margin: 10px; font-size:36px">Publié par ${article.user.name}</h6>
    <h4 style="font-weight: bold; padding : 0 50px">${article.contenue}</h4>
</article>`;

    //affiche les categories :
    content.innerHTML += `<h2 style="color: #DA70D6; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">Catégorie(s) de cet Article :</h2>`;
    categories.forEach((Categorie) => {
      content.innerHTML += `   
      <p style="background-color: #E6E6FA; width: 200px; border-radius: 8px; padding: 10px; color: #333; font-family: 'Georgia', serif; text-align: center; display: inline-block; margin-right: 10px;">${Categorie.nom}</p>`;
    });

    content.innerHTML += `   <h5 style="font-family: Arial, Helvetica, sans-serif; font-weight: bolder; color: #DA70D6; ">
        Commentaires :
      </h5>
      `;
    // Iterate over comments and generate HTML for each comment
    comments.forEach((comment, index) => {
      content.innerHTML += `
      <div class="comment">
        <p style="color: #C71585; font-weight: bold;">${comment.email}</p>
          <h6>${comment.contenu} de l'article : ${comment.articleId}</h6>
          <hr style="border: black 2px dashed ;">
        </div>
      `;
      // Add a separator between comments except for the last comment
      if (comment.cotenu === " ") {
        content.innerHTML += `Pas de commentaires sur cette article id : ${article.id}  `;
      }
    });
    content.innerHTML += `</article>`;
  }
}

homeButton.addEventListener("click", function () {
  changeContent("home");
});

signupButton.addEventListener("click", function () {
  changeContent("signup");
});

loginButton.addEventListener("click", function () {
  changeContent("login");
});

// You can add similar event listeners for other buttons if needed
function getArticlebyId(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getSignup() {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/signup`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// //the categories
// let categories = data[i].categories;
// let categrs = document.createElement("div");
// categrs.style = `display: flex;
//     justify-content: space-around;
//     flex-wrap: wrap;`;
// for (const e of categories) {
//   let util = document.createElement("h6");
//   util.innerText = e.name;
//   util.style = "color:#73026b;opacity:0.6;";
//   categrs.appendChild(util);
// }
// card.appendChild(categrs);
