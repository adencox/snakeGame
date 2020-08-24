function food() {
  this.size = 10;
  var cols = floor(field.xmax/this.size);
  var rows = floor(field.ymax/this.size);
  this.x = floor(random(cols))*this.size;
  this.y = floor(random(rows))*this.size;

  this.rand = function() {
    this.x = floor(random(cols))*this.size;
    this.y = floor(random(rows))*this.size;
  }

  this.show = function() {
    fill(255,32,32);
    rect(this.x,this.y,this.size,this.size);
  }
}
