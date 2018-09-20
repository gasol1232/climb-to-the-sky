
// enemy class
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*200)+100);
};


Enemy.prototype.update = function(dt) {
    
    if(this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

// enemy method 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    var self = this;
    
    if(this.pressedKey === 'left' && this.x > 0) { 
        this.x = this.x - 100;
    }

    
    if(this.pressedKey === 'right' && this.x < 400) { 
        this.x = this.x + 100;
    }

    
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    //this will make player jump only once when key is pressed:
    this.pressedKey = null;

    //position gets reset 
    if(this.y < 0) {
        this.reset();
    }

    allEnemies.forEach(function(enemy) {
    if(self.x >= enemy.x - 25 && self.x <= enemy.x + 25) {
        if(self.y >= enemy.y - 25 && self.y <= enemy.y + 25) {
            self.reset();
            }
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
  this.x = 200;
   this.y = 400;
};



var allEnemies = []; 

//All Enemies
(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());


var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
