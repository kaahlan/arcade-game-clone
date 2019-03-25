// Game score, resets if you touch a bug.
var score = 0;

// Enemies our player must avoid.
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started.
  this.x = x;
  this.y = y;
  // Randomized enemy spped, tested for fun gameplay.
  this.speed = 75 + Math.floor(Math.random() * 350 + 1);
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images.
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  // If enemy moves off canvas, resets x position and gives
  // new randomized speed.
  if (this.x > 505) {
    this.x = -101;
    this.speed = 75 + Math.floor(Math.random() * 350 + 1);
  }
};

// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // Starting X and Y positions based on image and canvas
  // dimensions.
  this.x = 202;
  this.y = 382;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // Keeps the player from moving off the canvas.
  if (this.x < 0) {
    this.x = 0;
  }

  if (this.x > 404) {
    this.x = 404;
  }

  if (this.y > 382) {
    this.y = 382;
  }

  // Player scores a point by reaching the river and resets
  // to starting position. Reets enemy x positions, adds a
  // point to score, and updates HTML.
  if (this.y < 0) {
    this.x = 202;
    this.y = 382;
    enemyRow1.x = -101;
    enemyRow2.x = -101;
    enemyRow3.x = -101;
    score += 1;
    document.querySelector('#currentScore').innerHTML = score;
  }

  // Collision detestion, checks against enemies in
  // allEnemies array. If enemies overlap, it resets user to
  // starting position, resets enemy x position and speed, sets
  // score to zero, and updates HTML.
  for (var i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i];
    if (enemy.x < this.x + 83 &&
      enemy.x + 83 > this.x &&
      enemy.y < this.y + 83 &&
      enemy.y + 83 > this.y) {
      this.x = 202;
      this.y = 382;
      enemyRow1.x = -101;
      enemyRow2.x = -101;
      enemyRow3.x = -101;
      enemyRow1.speed = 75 + Math.floor(Math.random() * 350 + 1);
      enemyRow2.speed = 75 + Math.floor(Math.random() * 350 + 1);
      enemyRow3.speed = 75 + Math.floor(Math.random() * 350 + 1);
      score = 0;
      document.querySelector('#currentScore').innerHTML = score;
    }
  }
};

Player.prototype.handleInput = function(arrow) {
  // Hnadles arrow key presses and player movement.
  switch (arrow) {
    case 'left':
      this.x -= 101;
      break;
    case 'up':
      this.y -= 83;
      break;
    case 'right':
      this.x += 101;
      break;
    case 'down':
      this.y += 83;
      break;
  }
};

// Draws the player on the screen.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Enemy objects, x and y positions based on image and canvas
// dimensions.
var enemyRow1 = new Enemy(-101, 50);
var enemyRow2 = new Enemy(-101, 133);
var enemyRow3 = new Enemy(-101, 216);

var allEnemies = [enemyRow1, enemyRow2, enemyRow3];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
