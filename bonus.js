function bonus() {
  this.size = 10;
  this.time = floor(random(1,10));
  var cols = floor(width/this.size);
  var rows = floor(height/this.size);
  this.x = floor(random(cols))*this.size;
  this.y = floor(random(rows))*this.size;

  this.rand = function() {
    this.x = floor(random(cols))*this.size;
    this.y = floor(random(rows))*this.size;
  }

  this.show = function() {
    fill(10,180,255);
    rect(this.x,this.y,this.size,this.size);
  }

  this.hide = function() {
    this.x = width*2;
    this.y = height*2;
  }

  this.randtime = function() {
    this.time = random(1,10);
  }
}
