const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = y;
    this.color = color;
    this.burst = false;
    this.speed = 8;
  }
  update() {
    if (this.y > this.targetY) {
      this.y -= this.speed;
    } else {
      this.burst = true;
      createParticles(this.x, this.y, this.color);
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 3, 10);
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.03;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function createParticles(x, y, color) {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.burst) fireworks.splice(index, 1);
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

function initFireworks() {
  setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworks.push(new Firework(x, y, color));
  }, 700);
}

const messages = [
  "May this Diwali bring light into your life!",
  "Wishing you peace, joy, and prosperity!",
  "Let's celebrate the victory of light over darkness!",
  "May your home be filled with love and laughter!",
];

function displayRandomMessage() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById('message').textContent = message;
}

initFireworks();
animate();
setInterval(displayRandomMessage, 3000);
