


(function() {
  // Variables
  var Photo, addListeners, canvas, createGrid, ctx, gridItem, grids, height, img, imgInfo, imgSrc, imgs, init, magnet, mouse, populateCanvas, render, resizeCanvas, rotateAndPaintImage, updateMouse, useGrid, width;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = (window.innerHeight * 70)/100;



  imgSrc = canvas.dataset.image;
  img = new Image();
  useGrid = true;
  imgInfo = {};
  imgs = [];
  grids = [];
  magnet = 2000;
  mouse = {
    x: 1,
    y: 0
  };

  init = function() {
    addListeners();
    img.onload = function(e) {
      
      var numberToShow;

      imgInfo.width = e.path ? e.path[0].width : e.target.width;
      imgInfo.height = e.path ? e.path[0].height : e.target.height;

      numberToShow = (Math.ceil(window.innerWidth / imgInfo.width)) * (Math.ceil(window.innerHeight / imgInfo.height));
      if (useGrid) {
        createGrid();
      }
      populateCanvas(numberToShow * 4);
      canvas.classList.add('ready');
      return render();
    };
    return img.src = imgSrc;
  };

  addListeners = function() {
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', updateMouse);
    return window.addEventListener('touchmove', updateMouse);
  };

  updateMouse = function(e) {
    mouse.x = e.clientX;
    return mouse.y = e.clientY;
  };

  resizeCanvas = function() {
    width = canvas.width = window.innerWidth;
    return height = canvas.height = window.innerHeight;
  };

  populateCanvas = function(nb) {
    var i, p, results;
    i = 0;
    results = [];
    while (i <= nb) {
      p = new Photo();
      imgs.push(p);
      results.push(i++);
    }
    return results;
  };

  createGrid = function() {
    var c, grid, i, imgScale, item, j, k, l, r, ref, ref1, ref2, results, x, y;
    imgScale = 0.5;
    grid = {
      row: Math.ceil(window.innerWidth / (imgInfo.width * imgScale)),
      cols: Math.ceil(window.innerHeight / (imgInfo.height * imgScale)),
      rowWidth: imgInfo.width * imgScale,
      colHeight: imgInfo.height * imgScale
    };
    for (r = j = 0, ref = grid.row; 0 <= ref ? j < ref : j > ref; r = 0 <= ref ? ++j : --j) {
      x = r * grid.rowWidth;
      for (c = k = 0, ref1 = grid.cols; 0 <= ref1 ? k < ref1 : k > ref1; c = 0 <= ref1 ? ++k : --k) {
        y = c * grid.colHeight;
        item = new gridItem(x, y, grid.rowWidth, grid.colHeight);
        grids.push(item);
      }
    }
    results = [];
    for (i = l = 0, ref2 = grids.length; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
      results.push(grids[i].draw());
    }
    return results;
  };

  gridItem = function(x = 0, y = 0, w, h) {
    this.draw = function() {
      ctx.drawImage(img, x, y, w, h);
    };
  };

  Photo = function() {
    var TO_RADIANS, finalX, finalY, forceX, forceY, h, r, seed, w, x, y;
    seed = Math.random() * (2.5 - 0.7) + 0.7;
    w = imgInfo.width / seed;
    h = imgInfo.height / seed;
    x = window.innerWidth * Math.random();
    finalX = x;
    y = window.innerHeight * Math.random();
    finalY = y;
    console.log(`INIT Y :: ${finalY} || INIT X :: ${finalX}`);
    r = Math.random() * (180 - (-180)) + (-180);
    forceX = 0;
    forceY = 0;
    TO_RADIANS = Math.PI / 180;
    this.update = function() {
      var distance, dx, dy, powerX, powerY, x0, x1, y0, y1;
      x0 = x;
      y0 = y;
      x1 = mouse.x;
      y1 = mouse.y;
      dx = x1 - x0;
      dy = y1 - y0;
      distance = Math.sqrt((dx * dx) + (dy * dy));
      powerX = x0 - (dx / distance) * magnet / distance;
      powerY = y0 - (dy / distance) * magnet / distance;
      forceX = (forceX + (finalX - x0) / 2) / 2.1;
      forceY = (forceY + (finalY - y0) / 2) / 2.2;
      x = powerX + forceX;
      y = powerY + forceY;
    };
    this.draw = function() {
      return rotateAndPaintImage(ctx, img, r * TO_RADIANS, x, y, w / 2, h / 2, w, h);
    };
  };

  rotateAndPaintImage = function(context, image, angle, positionX, positionY, axisX, axisY, widthX, widthY) {
    context.translate(positionX, positionY);
    context.rotate(angle);
    context.drawImage(image, -axisX, -axisY, widthX, widthY);
    context.rotate(-angle);
    return context.translate(-positionX, -positionY);
  };

  render = function() {
    var x, y;
    x = 0;
    y = 0;
    ctx.clearRect(0, 0, width, height);
    while (y < grids.length) {
      grids[y].draw();
      y++;
    }
    while (x < imgs.length) {
      imgs[x].update();
      imgs[x].draw();
      x++;
    }
    return requestAnimationFrame(render);
  };

  init();

  window.addEventListener('resize', function(){
    // console.log(this.width);
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = (window.innerHeight * 70)/100;

  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTtBQUFBLE1BQUEsS0FBQSxFQUFBLFlBQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsY0FBQSxFQUFBLE1BQUEsRUFBQSxZQUFBLEVBQUEsbUJBQUEsRUFBQSxXQUFBLEVBQUEsT0FBQSxFQUFBOztFQUNBLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixRQUF4Qjs7RUFDVCxHQUFBLEdBQU0sTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEI7O0VBQ04sS0FBQSxHQUFRLE1BQU0sQ0FBQyxLQUFQLEdBQWUsTUFBTSxDQUFDOztFQUM5QixNQUFBLEdBQVMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFBTSxDQUFDOztFQUNoQyxNQUFBLEdBQVMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7RUFDeEIsR0FBQSxHQUFNLElBQUksS0FBSixDQUFBOztFQUNOLE9BQUEsR0FBVTs7RUFDVixPQUFBLEdBQVUsQ0FBQTs7RUFDVixJQUFBLEdBQU87O0VBQ1AsS0FBQSxHQUFROztFQUNSLE1BQUEsR0FBUzs7RUFDVCxLQUFBLEdBQVE7SUFDUCxDQUFBLEVBQUUsQ0FESztJQUVQLENBQUEsRUFBRTtFQUZLOztFQUtSLElBQUEsR0FBTyxRQUFBLENBQUEsQ0FBQTtJQUNOLFlBQUEsQ0FBQTtJQUVBLEdBQUcsQ0FBQyxNQUFKLEdBQWEsUUFBQSxDQUFDLENBQUQsQ0FBQTtBQUVaLFVBQUEsWUFBQTs7TUFBQSxPQUFPLENBQUMsS0FBUixHQUFtQixDQUFDLENBQUMsSUFBTCxHQUFlLENBQUMsQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FB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QUFBO0FBckpBIiwic291cmNlc0NvbnRlbnQiOlsiIyBWYXJpYWJsZXNcbmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xud2lkdGggPSBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmhlaWdodCA9IGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5pbWdTcmMgPSBjYW52YXMuZGF0YXNldC5pbWFnZTtcbmltZyA9IG5ldyBJbWFnZSgpO1xudXNlR3JpZCA9IHRydWVcbmltZ0luZm8gPSB7fTtcbmltZ3MgPSBbXTtcbmdyaWRzID0gW107XG5tYWduZXQgPSAyMDAwO1xubW91c2UgPSB7XG5cdHg6MVxuXHR5OjBcbn1cblxuaW5pdCA9ICgpLT5cblx0YWRkTGlzdGVuZXJzKCk7XG5cdFxuXHRpbWcub25sb2FkID0gKGUpLT5cblx0XHQjIENoZWNrIGZvciBmaXJlZm94LiBcblx0XHRpbWdJbmZvLndpZHRoID0gaWYgZS5wYXRoIHRoZW4gZS5wYXRoWzBdLndpZHRoIGVsc2UgZS50YXJnZXQud2lkdGhcblx0XHRpbWdJbmZvLmhlaWdodCA9IGlmIGUucGF0aCB0aGVuIGUucGF0aFswXS5oZWlnaHQgZWxzZSBlLnRhcmdldC5oZWlnaHQgXG5cdFx0XHRcblx0XHRudW1iZXJUb1Nob3cgPSAoTWF0aC5jZWlsKHdpbmRvdy5pbm5lcldpZHRoIC8gaW1nSW5mby53aWR0aCkpICogKE1hdGguY2VpbCh3aW5kb3cuaW5uZXJIZWlnaHQgLyBpbWdJbmZvLmhlaWdodCkpXG5cdFx0XG5cdFx0Y3JlYXRlR3JpZCgpIGlmIHVzZUdyaWQ7XG5cdFx0cG9wdWxhdGVDYW52YXMobnVtYmVyVG9TaG93ICogNCk7XG5cdFx0XG5cdFx0IyBJbWFnZSBpcyByZWFkeSBhbmQgd2UncmUgcmVhZHkgdG8gZ29cblx0XHRjYW52YXMuY2xhc3NMaXN0LmFkZCgncmVhZHknKTtcblx0XHRyZW5kZXIoKTtcblx0XHRcblx0aW1nLnNyYyA9IGltZ1NyYztcblx0XG5hZGRMaXN0ZW5lcnMgPSAoKS0+XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLHJlc2l6ZUNhbnZhcyk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGVNb3VzZSk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB1cGRhdGVNb3VzZSk7XG5cdFxudXBkYXRlTW91c2UgPSAoZSktPlxuXG5cdG1vdXNlLnggPSBlLmNsaWVudFhcblx0bW91c2UueSA9IGUuY2xpZW50WVxuXHRcbnJlc2l6ZUNhbnZhcyA9ICgpLT5cblx0d2lkdGggPSBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0aGVpZ2h0ID0gY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XG4jIE1hZ2ljXG5wb3B1bGF0ZUNhbnZhcyA9IChuYiktPlxuXHRpID0gMDtcblx0d2hpbGUgaSA8PSBuYlxuXHRcdHAgPSBuZXcgUGhvdG8oKTtcblx0XHRpbWdzLnB1c2ggcFxuXHRcdGkrKztcblx0XG5jcmVhdGVHcmlkID0gKCktPlxuXHRpbWdTY2FsZSA9IDAuNVxuXHRncmlkID0ge1xuXHRcdHJvdzogTWF0aC5jZWlsKHdpbmRvdy5pbm5lcldpZHRoIC8gKGltZ0luZm8ud2lkdGggKiBpbWdTY2FsZSkpXG5cdFx0Y29sczogTWF0aC5jZWlsKHdpbmRvdy5pbm5lckhlaWdodCAvIChpbWdJbmZvLmhlaWdodCAqIGltZ1NjYWxlKSlcblx0XHRyb3dXaWR0aDogaW1nSW5mby53aWR0aCAqIGltZ1NjYWxlXG5cdFx0Y29sSGVpZ2h0OiBpbWdJbmZvLmhlaWdodCAqIGltZ1NjYWxlXG5cdH1cblx0XG5cdGZvciByIGluIFswLi4uZ3JpZC5yb3ddXG5cdFx0eCA9IHIgKiBncmlkLnJvd1dpZHRoXG5cdFx0Zm9yIGMgaW4gWzAuLi5ncmlkLmNvbHNdXG5cdFx0XHR5ID0gYyAqIGdyaWQuY29sSGVpZ2h0XG5cdFx0XHRcblx0XHRcdGl0ZW0gPSBuZXcgZ3JpZEl0ZW0oeCx5LGdyaWQucm93V2lkdGgsZ3JpZC5jb2xIZWlnaHQpXG5cdFx0XHRncmlkcy5wdXNoIGl0ZW07XG5cdFx0XHRcblx0Zm9yIGkgaW4gWzAuLi5ncmlkcy5sZW5ndGhdXG5cdFx0Z3JpZHNbaV0uZHJhdygpO1xuXHRcbmdyaWRJdGVtID0gKHggPSAwLCB5ID0gMCwgdywgaCktPlxuXHR0aGlzLmRyYXcgPSAoKS0+XG5cdFx0Y3R4LmRyYXdJbWFnZShpbWcsIHgsIHksIHcsIGgpO1xuXHRcdHJldHVyblxuXHRyZXR1cm5cblxuUGhvdG8gPSAoKS0+XG5cdHNlZWQgPSBNYXRoLnJhbmRvbSgpICogKDIuNSAtIDAuNykgKyAwLjc7XG5cdHcgPSBpbWdJbmZvLndpZHRoIC8gc2VlZFxuXHRoID0gaW1nSW5mby5oZWlnaHQgLyBzZWVkXG5cdHggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIE1hdGgucmFuZG9tKClcblx0ZmluYWxYID0geFxuXHR5ID0gd2luZG93LmlubmVySGVpZ2h0ICogTWF0aC5yYW5kb20oKVxuXHRmaW5hbFkgPSB5XHRcblx0Y29uc29sZS5sb2coXCJJTklUIFkgOjogI3tmaW5hbFl9IHx8IElOSVQgWCA6OiAje2ZpbmFsWH1cIilcblx0ciA9IE1hdGgucmFuZG9tKCkgKiAoMTgwIC0gKC0xODApKSArICgtMTgwKVxuXHRcblx0Zm9yY2VYID0gMFxuXHRmb3JjZVkgPSAwXG5cdFxuXHRUT19SQURJQU5TID0gTWF0aC5QSS8xODBcblx0XG5cdHRoaXMudXBkYXRlID0gKCktPlxuXHRcdHgwID0geFxuXHRcdHkwID0geVxuXHRcdHgxID0gbW91c2UueFxuXHRcdHkxID0gbW91c2UueVxuXHRcdFxuXHRcdGR4ID0geDEgLSB4MFxuXHRcdGR5ID0geTEgLSB5MFxuXHRcdFxuXHRcdGRpc3RhbmNlID0gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSlcblx0XHRwb3dlclggPSB4MCAtIChkeCAvIGRpc3RhbmNlKSAqIG1hZ25ldCAvIGRpc3RhbmNlO1xuXHRcdHBvd2VyWSA9IHkwIC0gKGR5IC8gZGlzdGFuY2UpICogbWFnbmV0IC8gZGlzdGFuY2Vcblx0XHRcblx0XHRmb3JjZVggPSAoZm9yY2VYICsgKGZpbmFsWCAtIHgwKSAvIDIpIC8gMi4xXG5cdFx0Zm9yY2VZID0gKGZvcmNlWSArIChmaW5hbFkgLSB5MCkgLyAyKSAvIDIuMlxuXG5cdFx0XG5cblx0XHR4ID0gcG93ZXJYICsgZm9yY2VYXG5cdFx0eSA9IHBvd2VyWSArIGZvcmNlWVxuXHRcblx0XHRyZXR1cm5cblx0dGhpcy5kcmF3ID0gKCktPlxuXHRcdHJvdGF0ZUFuZFBhaW50SW1hZ2UoY3R4LCBpbWcsIHIgKiBUT19SQURJQU5TLCB4LCB5LCB3IC8gMiwgaCAvIDIsIHcsIGgpXG5cdHJldHVyblxuXG5yb3RhdGVBbmRQYWludEltYWdlID0gKCBjb250ZXh0LCBpbWFnZSwgYW5nbGUgLCBwb3NpdGlvblgsIHBvc2l0aW9uWSwgYXhpc1gsIGF4aXNZLCB3aWR0aFgsIHdpZHRoWSktPlxuXHRjb250ZXh0LnRyYW5zbGF0ZSggcG9zaXRpb25YLCBwb3NpdGlvblkgKTtcblx0Y29udGV4dC5yb3RhdGUoIGFuZ2xlICk7XG5cdGNvbnRleHQuZHJhd0ltYWdlKCBpbWFnZSwgLWF4aXNYLCAtYXhpc1ksIHdpZHRoWCwgd2lkdGhZICk7XG5cdGNvbnRleHQucm90YXRlKCAtYW5nbGUgKTtcblx0Y29udGV4dC50cmFuc2xhdGUoIC1wb3NpdGlvblgsIC1wb3NpdGlvblkgKTtcblxucmVuZGVyID0gKCktPlxuXHR4ID0gMFxuXHR5ID0gMFxuXHRjdHguY2xlYXJSZWN0KDAsMCx3aWR0aCxoZWlnaHQpXG5cdHdoaWxlIHkgPCBncmlkcy5sZW5ndGhcblx0XHRncmlkc1t5XS5kcmF3KClcblx0XHR5Kytcblx0d2hpbGUgeCA8IGltZ3MubGVuZ3RoXG5cdFx0aW1nc1t4XS51cGRhdGUoKVxuXHRcdGltZ3NbeF0uZHJhdygpXG5cdFx0eCsrXG5cdFx0XG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSByZW5kZXJcblx0XG5cdFxuXHRcdFxuaW5pdCgpOyJdfQ==
//# sourceURL=coffeescript