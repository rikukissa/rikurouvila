(function() {
  define(function(require) {
    var $, Star, colors, ctx, followers, height, launch, offset, running, sprite, stars, tick, width;

    window.requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    $ = require('jquery');
    sprite = require('image!img/star.png');
    ctx = null;
    stars = [];
    height = 0;
    width = $(window).width() / 10;
    running = true;
    colors = ['#3e80c2', '#47c5ee', '#ea5425', '#f8da3d'];
    offset = 100;
    followers = 15;
    Star = (function() {
      function Star(follower) {
        this.follower = follower != null ? follower : false;
        this.y = height - 16;
        if (!this.follower) {
          this.x = -16 + Math.random() * width;
          this.vel = {
            x: -1 + Math.random() * 2,
            y: -4 + -3 * Math.random()
          };
        } else {
          this.x = -10 + width / followers * stars.length;
          this.vel = {
            x: 0,
            y: -3 * Math.random()
          };
        }
      }

      Star.prototype.destroy = function() {
        return stars.splice(stars.indexOf(this), 1);
      };

      Star.prototype.render = function() {
        ctx.drawImage(sprite, this.x, this.y);
        this.x += this.vel.x;
        this.y += this.vel.y;
        if (this.follower) {
          this.vel.y += 1;
        } else {
          this.vel.y += 0.3;
        }
        if (this.y > height - 10 && this.follower) {
          this.vel.y = -2;
        }
        if (this.y - 16 > ctx.canvas.height) {
          return this.destroy();
        }
      };

      return Star;

    })();
    tick = function() {
      var color, i, star, _i, _j, _len;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (running) {
        stars.push(new Star);
      }
      ctx.save();
      ctx.translate(offset, 0);
      for (i = _i = 0, _len = colors.length; _i < _len; i = ++_i) {
        color = colors[i];
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(Math.ceil(width / colors.length) * i, 0, Math.ceil(width / colors.length), height);
        ctx.restore();
      }
      for (i = _j = stars.length - 1; _j >= 0; i = _j += -1) {
        star = stars[i];
        star.render();
      }
      ctx.restore();
      height += 3;
      if (height > $(window).height() && stars.length === 0) {
        running = false;
      }
      if (stars.length > 0) {
        return requestAnimFrame(tick);
      }
    };
    launch = function() {
      var i, _i;

      stars = [];
      running = true;
      for (i = _i = 0; 0 <= followers ? _i <= followers : _i >= followers; i = 0 <= followers ? ++_i : --_i) {
        stars.push(new Star(true));
      }
      return tick();
    };
    return {
      init: function() {
        ctx = document.getElementById('stars').getContext('2d');
        $(window).on('resize', function() {
          $(ctx.canvas).attr({
            'width': width + offset,
            'height': $(window).height()
          });
          width = $(window).width() / 10;
          if (!running) {
            return launch();
          }
        }).resize();
        return launch();
      }
    };
  });

}).call(this);
