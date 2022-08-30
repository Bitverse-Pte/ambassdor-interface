import { useMount } from "ahooks";

const init = ()=>{
let c, $, w, h, u, cnt;
c = document.getElementById('tunnel');
if(!c) return;
$ = c.getContext('2d');

w = c.width = window.innerWidth;
h = c.height = window.innerHeight;

u = 171;
cnt = 10;

$.fillStyle = 'hsla(0,1%,5%,1)';

const draw = function() {
  var i, b, arr, _arr, rz, x, y, px, py;
  var pts = Math.cos(Math.PI * 2 / 8 / 2);
  $.globalCompositeOperation = "source-over";
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";

  var dims = 0.80 + Math.sin(cnt / 43) / 40;
  var rot = Math.sin(cnt / 73);

  var _w = w;
  for (b = 0; b < 15; b++) {
    rz = cnt / 35 + b / 3 * rot;
    px = Math.cos(rz / 6) * (b / 20) + 200;
    py = Math.sin(rz / 6) * (b / 20) + 200;
    $.beginPath();
    $.lineWidth = 2;
    arr = [];
    for (i = 0; i < 8; i++) {
      x = Math.sin(rz) * _w + 1000;
      y = Math.cos(rz) * _w + 250;
      rz += Math.PI * 2 / 8;
      if (i) {
        $.lineTo(x, y);
      } else {
        $.moveTo(x, y);
      }
      arr[i] = [x, y];
    }
    $.strokeStyle = 'hsla(' + u + ',85%,50%,.8)';
    $.closePath();
    $.stroke();

    if (b) {
      for (i = 0; i < 8; i++) {
        $.beginPath();
        $.moveTo(arr[i][0], arr[i][1]);
        $.lineTo(_arr[i][0], _arr[i][1]);
        $.stroke();
      }
    }

    _arr = [];
    rz += Math.PI * 2 / 8 / 2;
    for (i = 0; i < 8; i++) {
      x = Math.sin(rz) * _w * pts + 1000;
      y = Math.cos(rz) * _w * pts + 250;
      _arr[i] = [x, y];
      rz += Math.PI * 2 / 8;
    }
    _w *= dims;
  }
  cnt++;
  window.requestAnimationFrame(draw);
}
window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);
draw();
}
export default ()=>{
    useMount(init)
    
    return <canvas id='tunnel'></canvas>
}