// url = "http://localhost:3000";
const id = require("faker/lib/locales/id_ID");

function getArticles(take = 20, skip = 0) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/articles?take=${take}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// // Function to get categories
// function getCategories() {
//   return new Promise((resolve, reject) => {
//     fetch(`${url}/categories`)
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

// Function to display the comments
// function getComments() {
//   fetch("http://localhost:3000/commentaires") // Remplacez l'URL avec votre endpoint correspondant aux commentaires
//     .then((response) => response.json())
//     .then((data) => {
//       const commentsDiv = document.getElementById("comments");
//       commentsDiv.innerHTML = ""; // Efface les commentaires précédents

//       data.forEach((comment) => {
//         const commentElement = document.createElement("p");
//         commentElement.textContent = comment.content;
//         commentsDiv.appendChild(commentElement);
//       });
//       const commentsContainer = document.querySelector("#comments");

//       // Assurez-vous que l'élément #comments existe dans votre page HTML

//       data.forEach((comment) => {
//         // Créez un nouvel élément HTML pour chaque commentaire
//         const commentElement = document.createElement("div");
//         commentElement.classList.add("comment");

//         // Ajoutez les informations du commentaire dans l'élément
//         commentElement.innerHTML = `
//           <h3>${comment.author}</h3>
//           <p>${comment.content}</p>
//           <span>${comment.date}</span>
//         `;

//         // Ajoutez l'élément du commentaire au conteneur des commentaires
//         commentsContainer.appendChild(commentElement);
//       });
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la récupération des commentaires:", error);
//     });
// }

// Function to change the content based on the selected option
// function commentaires(cmts, div) {
//   console.log(cmts);
//   div.innerHTML = "";
//   let pc = document.createElement("div");
//   pc.style.padding = "12px";
//   for (let i = 0; i < 20; i++) {
//     let c = document.createElement("p");
//     pc.appendChild(c);
//     c.innerHTML = cmts[i].contenu;
//     pc.append(c);
//     let line = document.createElement("hr");
//     line.style = `border: 5px solid #73026b;
//         border-radius: 5px;`;
//     pc.append(line);
//     // div.style.display='block'
//   }
//   div.append(pc);
//   // div.style="transition: display 0.3s ease;"
//   div.classList.toggle("hide");
// }

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
        // for (let i = 0; i < data.length; i++) {
        //   if (i % 4 == 0) {
        //     var row = document.createElement("div");
        //     row.style.padding = "10px";
        //     row.classList.add("row");
        //   }
        logoutButton.style.display = "flex";
        loginButton.style.display = "none";
        homeButton.style.display = "none";
        signupButton.style.display = "none";
        addbutton.style.display = "flex";

        // let col = document.createElement("div");
        // col.classList.add("col-md-3");

        // let card = document.createElement("div");
        // card.classList.add("card");
        // card.style = "display: flex; flex-direction: column; height: 100%;";

        // //the image of the articles
        // let image = document.createElement("img");
        // image.setAttribute("src", data[i].image);
        // image.classList.add("card-img-top");
        // card.appendChild(image);

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

        // //the title
        // let title = document.createElement("h1");
        // title.innerText = data[i].titre;
        // title.style = "text-align: center;color: #73026b;";
        // card.appendChild(title);

        // //the content
        // let contentDiv = document.createElement("div");
        // contentDiv.classList.add("card-body");
        // contentDiv.style = "flex-grow: 1;";

        // //content article
        // let articleContent = document.createElement("p");
        // articleContent.innerText = data[i].contenue;
        // articleContent.classList.add("card-text");
        // articleContent.style = "text-align: center;font-weight:bold;";
        // contentDiv.appendChild(articleContent);
        // card.appendChild(contentDiv);

        // // button
        // let comment = document.createElement("div");
        // comment.classList.add("col-md-5");
        // comment.style =
        //   "display:block;margin: auto;width:100%;display:flex;flex-direction: column;";
        // let btn = document.createElement("button");
        // btn.innerText = "Comments";
        // btn.style =
        //   "background-color:#407bff; color:white;margin-bottom:7px;margin:auto;margin-bottom: 3px;";
        // btn.classList.add("btn");
        // btn.setAttribute("type", "submit");
        // let divComments = document.createElement("div");
        // // divComments.style.display='none'
        // console.log(data[i].commentaire);
        // btn.onclick = function () {
        //   commentaires(data[i].commentaire, divComments);
        // };
        // comment.appendChild(btn);
        // comment.appendChild(divComments);
        // card.append(comment);
        // //
        // col.appendChild(card);
        // row.appendChild(col);
        // content.appendChild(row);
      }
      // Process the data further as neede
      else {
        content.innerHTML = `<img src="./images/blog/404 error with person looking for-rafiki.png"
       style ="max-width: 80%; max-height: 80vh;object-fit: contain;display: flex;justify-content: center;align-items: center;margin:auto;">`;
      }
      // );
      // .catch(error => {
      //   console.log('Error:', error.message);
      // });
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
        "./images/blogs/404 error with person looking for-rafiki.png"
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

async function changeContent(page) {
  // Clear the existing content
  content.innerHTML = "";
  // Create the new content based on the selected page
  if (page === "home") {
    content.innerHTML = `
<div id="content" style="padding: 10px;">
   <div class="container-fluid" id="description" style="display: flex;justify-content: space-around;">
     <img class="col-md-5" src="./images/blog/Blog post-rafiki.png" alt="BLOG!!">
     <div class="col-md-5" style="margin: 140px auto;">
       <h1 style="font-family: Arial;color: #022f73;font-size: 100px;">BLOGGER</h1>
       <b>
             <p style="margin: 20px 3px;width: 500px;color:black; text-align: center;" >Discover. Savor. Style. Your passport to a world of travel, food, and fashion awaits.<br><span style="color: #000000; align-items: center;"> BLOG ^-^ </span></p>
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
                <button onclick="profile()" class="btn" type="submit" style="background-color:rgb(78, 78, 106); color:black;">Sign Up</button>
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
    const articles = await getArticles();
    const user = getAuthUser();

    html = "";
    articles.forEach((article) => {
      html += `
       <article class="mb-4 border p-2">
       <img src="${article.image}" class="img-fluid" style="max-height: 250px; width: 800%; object-fit: contain;" />
       <h2 onclick="readArticle(${article.id})">le Titre : ${article.titre}</h2>
           <button onclick="changeContent('read')" style = "background-color: #553a7d;
           font-weight: bold;
           color: #fff;
           padding: 0 10px;
           margin: 0 10px;" onclick=changeContent('read') >Read more... </button>`;
      if (user != null && user.id == article.userId) {
        html += `<h6> les articles de l'user qui l'id : ${user.id}</h6>`;
      }
      html += `</article>`;
    });

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
     <img class="col-md-5" src="./images/blog/Blog post-rafiki.png" alt="BLOG!!">
     <div class="col-md-5" style="margin: 140px auto;">
       <h1 style="font-family: Arial;color: #022f73;font-size: 100px;">BLOGGER</h1>
       <b>
             <p style="margin: 20px 3px;width: 500px;color:black; text-align: center;" >Discover. Savor. Style. Your passport to a world of travel, food, and fashion awaits.<br><span style="color: #000000; align-items: center;"> BLOG ^-^ </span></p>
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
  } else if (page === "read") {
    const article = await getArticlebyId(id);

    const comment = await getCommentairebyId(211408);

    content.innerHTML = "";
    content.innerHTML = `
         <article class="mb-4 border p-2">
        <h2 style = "color:#DA70D6  ;   font-family: Arial, Helvetica, sans-serif; font-weight: bold;"> le titre de l"article : ${article.titre}</h2>
        <img src="${article.image}" class="img-fluid" style="max-height: 250px; width: 800%; object-fit: contain;" />
        <h6>publie par ${article.user.name}
       <h4 style = "font-family: Arial, Helvetica, sans-serif; font-weight: bold;">${article.contenue}</h4> 
        <br>
        <h5 style = "color:#DA70D6  ;   font-family: Arial, Helvetica, sans-serif; font-weight: bold; ">Commentaires : </h5>
 <h6>${comment.contenu} de l'article : ${comment.articleId}</h6>
`;
    content.innerHTML += `</article>`;
  }
  // else if (page === "signup") {
  //   content.innerHTML = `
  // <h2> successfull sign up </h2>
  // <img src = "./images/blogs/Successful purchase-cuate.png">
  //   `;
  // }
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

//fucntion to get comments

function getCommentairebyId(id) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/Commentaires/${id}`)
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
