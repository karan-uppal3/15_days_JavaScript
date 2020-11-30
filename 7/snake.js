function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    
    this.update = function() {
      
      if ( this.total == this.tail.length) {
        for ( var i = 0 ; i < this.total-1 ; i++ ) {
          this.tail[i] = this.tail[i+1];      
        }
      }
      
      this.tail[this.total-1] = createVector(this.x,this.y);
      
      this.x = this.x + this.xspeed*scl;
      this.y = this.y + this.yspeed*scl;
      
      this.x = constrain(this.x,0,width-scl);
      this.y = constrain(this.y,0,height-scl);
    
    }
    
    this.show = function() {
      
      var i;
  
      for ( i = 0 ; i < this.total ; i++ )
      {
        fill(0,255,0);
        rect(this.tail[i].x,this.tail[i].y,scl,scl);
        fill(0);
        textSize(scl/2);
        text(str(this.total-i),this.tail[i].x,this.tail[i].y, this.tail[i].x+scl,this.tail[i].y+scl);
      }
      
      fill(0,255,0);
      rect(this.x,this.y,scl,scl);
      fill(0);
      textSize(scl/2);
      text(str(0),this.x,this.y, this.x+scl,this.y+scl);
    }
    
    this.dir = function (x,y) {
      this.xspeed = x;
      this.yspeed = y;
    }
    
    this.eat = function(pos) {
      var d = dist(this.x,this.y,pos.x,pos.y);
      if ( d < 1 ) {
        this.total++;
        return true;
      }
      else {
        return false;
      }
    }
    
    this.death = function() {
      for ( var i = 0 ; i < this.tail.length ; i++ ) 
      {
        var pos = this.tail[i];
        var d = dist(this.x,this.y,pos.x,pos.y);
        
        if ( d < 1 ) {
          this.total = 0;
          this.tail = [];
          this.x = 0;
          this.y = 0;
          this.xspeed = 1;
          this.yspeed = 0;
        }    
      } 
    }

    this.moveOnPath = function(moves) {
        var curr = moves.pop();
        var next = moves[moves.length-1];
        var dirx = next.x - curr.x;
        var diry = next.y - curr.y;
        this.dir(dirx,diry);
    }
  }