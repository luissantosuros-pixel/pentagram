let currentUser=null;

function users(){
return JSON.parse(localStorage.getItem("pentagranUsers")||"{}");
}

function save(u){
localStorage.setItem("pentagranUsers",JSON.stringify(u));
}

function registerUser(){

let name=userName.value.trim();
let pass=userPass.value.trim();

if(!name||!pass)return;

let u=users();

if(u[name]){
alert("Ya existe");
return;
}

u[name]={
password:pass,
bio:"Mi perfil",
posts:[],
reels:[]
};

save(u);

alert("Cuenta creada");
}

function login(){

let name=userName.value.trim();
let pass=userPass.value.trim();

let u=users();

if(!u[name]) return alert("No existe");

if(u[name].password!==pass)
return alert("Contraseña incorrecta");

currentUser=name;

loginScreen.classList.add("hidden");

app.classList.remove("hidden");

loadUser();
}

function logout(){

currentUser=null;

app.classList.add("hidden");

loginScreen.classList.remove("hidden");
}

function openSection(id){

document.querySelectorAll(".section")
.forEach(s=>s.classList.remove("active"));

document.getElementById(id)
.classList.add("active");
}

function loadUser(){

let u=users()[currentUser];

profileName.innerText=currentUser;

profileBio.innerText=u.bio;

renderPosts();

renderReels();
}

function editProfile(){

let all=users();

let bio=prompt("Bio:",all[currentUser].bio);

if(bio!==null){

all[currentUser].bio=bio;

save(all);

loadUser();
}
}

function createPost(){

let text=postText.value;

let file=postImage.files[0];

if(!file)return;

let reader=new FileReader();

reader.onload=()=>{

let all=users();

all[currentUser].posts.unshift({
text,
image:reader.result
});

save(all);

postText.value="";
postImage.value="";

renderPosts();

openSection("home");
};

reader.readAsDataURL(file);
}

function createReel(){

let title=reelTitle.value;

let file=reelVideo.files[0];

if(!file)return;

let reader=new FileReader();

reader.onload=()=>{

let all=users();

all[currentUser].reels.unshift({
title,
video:reader.result
});

save(all);

reelTitle.value="";
reelVideo.value="";

renderReels();

openSection("reels");
};

reader.readAsDataURL(file);
}

function renderPosts(){

home.innerHTML="";

let all=users();

for(let name in all){

all[name].posts.forEach(p=>{

home.innerHTML+=`
<div class="post">
<b>${name}</b>
<p>${p.text}</p>
<img src="${p.image}">
</div>
`;
});
}
}

function renderReels(){

reels.innerHTML="";

let all=users();

for(let name in all){

all[name].reels.forEach(r=>{

reels.innerHTML+=`
<div class="reel">
<b>${name}</b>
<h3>${r.title}</h3>
<video controls src="${r.video}"></video>
</div>
`;
});
}
}