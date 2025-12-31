// ===== FIREWORK SYSTEM (YOUR ORIGINAL) =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let fireworks = [];
class Firework{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random()*canvas.height/3; 
    this.color = `hsl(${Math.random()*360},100%,70%)`;
    this.exploded = false;
    this.particles=[];
  }
  explode(){
    for(let i=0;i<40;i++){
      this.particles.push({
        x:this.x,y:this.y,
        dx:Math.cos(i)*Math.random()*4,
        dy:Math.sin(i)*Math.random()*4,
        life:60
      });
    }
  }
  update(){
    if(!this.exploded){
      this.y-=4;
      if(this.y<=this.targetY){
        this.exploded=true;
        this.explode();
      }
    }else{
      this.particles.forEach(p=>{
        p.x+=p.dx;
        p.y+=p.dy;
        p.life--;
      });
    }
  }
  draw(){
    ctx.fillStyle=this.color;
    if(!this.exploded){
      ctx.beginPath();
      ctx.arc(this.x,this.y,2,0,Math.PI*2);
      ctx.fill();
    }else{
      this.particles.forEach(p=>{
        ctx.fillRect(p.x,p.y,3,3);
      });
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  fireworks.forEach((f,i)=>{
    f.update();
    f.draw();
    if(f.exploded && f.particles.every(p=>p.life<=0))
      fireworks.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

// ===== MUSIC & NAME MEMORY =====
const music = document.getElementById("bgMusic");
const nameInput = document.getElementById("nameInput");
nameInput.value = localStorage.getItem("name") || "";
nameInput.oninput = ()=>localStorage.setItem("name",nameInput.value);

// ===== AUTO TYPING WISH =====
const wishes = [
  "Hello 2026 ✨",
  "Make every day of 2026 count 🎯",
  "Moments that turn into memories 🎉",
  "Positive vibes only 🌈",
  "Wishing you love in every moment 💫",
  "May this year heal and inspire you 💖",
  "Dream big, work hard, stay happy 😊",
  "Good times are on the way 🚀",
  "Wishing you health, wealth & happiness 🙏"
];
let i=0,j=0;
const typingEl = document.getElementById("typingWish");

function typeWish(){
  if(j<wishes[i].length){
    typingEl.innerHTML+=wishes[i][j++];
    setTimeout(typeWish,80);
  }else{
    setTimeout(()=>{
      typingEl.innerHTML="";
      j=0;
      i=(i+1)%wishes.length;
      typeWish();
    },2000);
  }
}
typeWish();

// ===== FLOATING EMOJIS =====
setInterval(()=>{
  const e=document.createElement("div");
  // e.innerText=["🚀"][Math.floor(Math.random()*1)];
  e.style.position="fixed";
  e.style.left=Math.random()*100+"vw";
  e.style.bottom="0";
  e.style.fontSize="20px";
  e.style.animation="floatUp 4s linear";
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),4000);
},700);

// ===== START CELEBRATION =====
function startCelebration(){
  const name=nameInput.value||"Friend";
  const wish=document.getElementById("personalWish");
  wish.innerHTML=`🎉 Happy New Year <span style="color:gold">${name}</span> 🎉<br>Have a nice year ✨`;
  wish.style.opacity=1;

  music.play();
  document.getElementById("title").classList.add("beat");

  setInterval(()=>fireworks.push(new Firework()),500);
}

/* Responsive canvas */
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);