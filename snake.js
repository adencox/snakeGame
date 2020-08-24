function snake() {
  this.size = 10;
  var cols = floor((field.xmax-field.offset)/this.size);
  var rows = floor((field.ymax-field.offset)/this.size);
  this.x = floor(random(cols/4))*this.size;
  this.y = floor(random(rows))*this.size;
  this.xvel = 1;
  this.yvel = 0;
  this.speed = 10;
  this.total = 0;
  this.stop = false;
  this.tail = [];
  this.bonus = 0;

  this.update = function() {
    for (var i=0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x,this.y);
    }

    this.x = this.x + this.xvel*this.speed;
    this.y = this.y + this.yvel*this.speed;
    this.x = constrain(this.x, 0-this.size, width+this.size);
    this.y = constrain(this.y, 0-this.size, height+this.size);
    this.show();
  }

  this.show = function() {
    fill(99,255,32);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }
    rect(this.x, this.y, this.size, this.size);
  }

  this.reset = function() {
    this.x = floor(random(cols/4))*this.size;
    this.y = floor(random(rows))*this.size;
    this.total = 0;
    this.bonus = 0;
    this.xvel = 1;
    this.yvel = 0;
    this.stop = false;
    this.tail = [];
  }
}
