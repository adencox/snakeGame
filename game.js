var snake, food, bonus, t, t0, t1, state, highscore, field;

function setup() {
  frameRate(10);
  createCanvas(320, 240);
  field = new field();
  snake = new snake();
  food = new food();
  bonus = new bonus();
  t = 0;
  t0 = random(1,10);
  t1 = 60;
  state = 0;
  highscore = 0;
}

function draw() {
  background(75);
  if (state === 0) {
    //start screen
    state0();
  } else if (state === 1) {
    //gameplay screen
    state1();
  } else if (state === 2) {
    //end screen
    state2();
  }
}

function keyPressed() {
  if (snake.stop === false) {
    if (keyCode === RIGHT_ARROW) {
      if (snake.xvel === 0) {
        snake.xvel = 1;
        snake.yvel = 0;
      }
    } else if (keyCode === LEFT_ARROW) {
      if (snake.xvel === 0) {
        snake.xvel = -1;
        snake.yvel = 0;
      }
    } else if (keyCode === UP_ARROW) {
      if (snake.yvel === 0) {
        snake.yvel = -1;
        snake.xvel = 0;
      }
    } else if (keyCode === DOWN_ARROW) {
      if (snake.yvel === 0) {
        snake.yvel = 1;
        snake.xvel = 0;
      }
    }
  }
}

function eat() {
  if (dist(food.x,food.y,snake.x,snake.y) <= snake.size/2) {
    food.rand();
    if (checkpos(food.x,food.y) === true) {
      food.rand();
      checkpos(food.x,food.y);
    } else {
      food.show();
    }
    snake.total ++;
  }
  if (dist(bonus.x,bonus.y,snake.x,snake.y) <= snake.size/2) {
    bonus.hide();
    t0 = t + 10 + bonus.time * 12;
    t1 = t0 + 5 * 12;
    snake.total++;
    snake.bonus++;
  }
}

function death() {
  if (snake.x > field.xmax) {
    //RHS
    restart();
  }
  if (snake.x < field.xmin) {
    //LHS
    restart();
  }
  if (snake.y < field.ymin) {
    //TOP
    restart();
  }
  if (snake.y > field.ymax) {
    //BOTTOM
    restart();
  }
  for (var i = 0; i < snake.tail.length; i++) {
    if (dist(snake.x,snake.y,snake.tail[i].x,snake.tail[i].y) < snake.size/2) {
      restart();
    }
  }
}

function restart() {
  snake.xvel = 0;
  snake.yvel = 0;
  state = 2;
  snake.stop = true;
    food.rand();
}

function checkpos(x,y) {
  for (var i = 0; i < snake.tail.length; i++) {
    var d = dist(x,y,snake.tail[i].x,snake.tail[i].y);
    if (d <= snake.size) {
       return true;
    }
  }
  return false;
}

function checkbonus() {
  if (t === t0) {
    bonus.rand();
    if (checkpos(bonus.x,bonus.y) === true) {
      bonus.rand();
      checkbonus();
    } else {
      bonus.show();
    }
  }
  if (t === t1) {
    bonus.hide();
    t0 = t + 10 + bonus.time * 12;
    t1 = t0 + 5*12;
  }
}

function mousePressed() {
  if (state === 0) {
    state = 1;
  }
  if (state === 2) {
    snake.reset();
    t = 0;
    t0 = random(1,10);
    t1 = 60;
    state = 1;
  }
}

function field() {
  // playing field available to snake
  this.offset = 9; //1 less than size of snake
  this.xmin = this.offset;
  this.xmax = width - this.offset;
  this.ymin = this.offset;
  this.ymax = height - this.offset;
}

function state1() {
  console.log(snake.x, snake.y);
  // gameplay screen
  bonus.show();
  food.show();
  snake.update();
  eat();
  death();
  checkbonus();
  textSize(10);
  var score = snake.total + (4 * snake.bonus);
  fill(99,255,32);
  text("" + score, 5, 5);
  if (score > highscore) {
    highscore = score;
  }
  text("Best:" + highscore, 35, 5);
  textAlign(CENTER,CENTER);
  t++;
}

function state2() {
  // end screen
  fill(99,255,32);
  textSize(50);
  text("GAME OVER", width/2, height/2);
  textAlign(CENTER,CENTER);
  textSize(15);
  var score = snake.total + (4 * snake.bonus);
  text("Score = " + score, width/2, 2*height/3);
  textSize(10);
  text("Best:" + highscore, 35, 5);
  textSize(20);
  text("Click anywhere to restart", width/2, 3*height/4 + 30);
}

function state0() {
  // start screen
  fill(99,255,32);
  textSize(50);
  text("SNAK3", width/2, height/3);
  textAlign(CENTER,CENTER);
  textSize(10);
  text("By Aden Cox", width/2, height/3 + 30);
  textSize(20);
  text("Click anywhere to start", width/2, 3*height/4);
}
