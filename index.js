//////////////////////////////////////////////////////////////
function onCreate() {
    ShowToast();
}
// TOAST
function ShowToast() {
    var x = document.getElementById("Toast");
    if (x) {
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3900);
    }
}
// FPS WEBS
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;
function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        if (fps) {
            fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        }
        startTime = time;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
}
tick();

// LINK
function Facebook() { window.open('https://www.facebook.com/tungwiboo', '_blank'); }
function Discord() { window.open('https://discord.gg/s5vagyAy8', '_blank'); }
function Zalo() { window.open('https://zalo.me/0364914860', '_blank'); }

function DarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// QR CODE SLIDE
function ToggleQR(id) {
    var qrBox = document.getElementById(id);
    if (qrBox) {
        if (qrBox.classList.contains("show")) {
            qrBox.classList.remove("show");
        } else {
            // CloseAllQR();
            qrBox.classList.add("show");
        }
    }
}
function CloseAllQR() {
    var allQR = document.querySelectorAll('.QRCodeBox');
    allQR.forEach(function(box) {
        box.classList.remove('show');
    });
}

//▬▬▬▬▬▬▬▬▬▬
// MUSIC PLAYER & REAL VISUALIZER
//▬▬▬▬▬▬▬▬▬▬
var audio = document.getElementById("AudioPlayer");
var disk = document.getElementById("Disk");
var playIcon = document.getElementById("PlayIcon");
var bars = [
    document.getElementById("bar1"), document.getElementById("bar2"),
    document.getElementById("bar3"), document.getElementById("bar4"), document.getElementById("bar5")
];
var currTime = document.getElementById("CurrentTime");
var durTime = document.getElementById("TotalDuration");

var context, analyser, src, array;
var audioInitialized = false;

function initAudioContext() {
    if (!audioInitialized) {
        context = new (window.AudioContext || window.webkitAudioContext)();
        analyser = context.createAnalyser();
        src = context.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 256;
        array = new Uint8Array(analyser.frequencyBinCount);
        audioInitialized = true;
        renderVisualizer();
    }
}

function renderVisualizer() {
    if (!audio.paused) {
        requestAnimationFrame(renderVisualizer);
        analyser.getByteFrequencyData(array);
        bars[0].style.height = Math.max(3, (array[2] / 255) * 20) + "px";
        bars[1].style.height = Math.max(3, (array[10] / 255) * 20) + "px";
        bars[2].style.height = Math.max(3, (array[20] / 255) * 20) + "px";
        bars[3].style.height = Math.max(3, (array[40] / 255) * 20) + "px";
        bars[4].style.height = Math.max(3, (array[80] / 255) * 20) + "px";
        bars.forEach(bar => {
            if(parseInt(bar.style.height) > 15) bar.style.background = "#FF00FF";
            else bar.style.background = "#00FFFF";
        });
    } else {
        bars.forEach(bar => bar.style.height = "3px");
    }
}

function ToggleMusic() {
    if (!audioInitialized) {
        initAudioContext();
        if (context.state === 'suspended') { context.resume(); }
    }
    if (audio.paused) {
        audio.play();
        playIcon.className = "fas fa-pause";
        disk.classList.add("rotating");
        renderVisualizer();
    } else {
        audio.pause();
        playIcon.className = "fas fa-play";
        disk.classList.remove("rotating");
    }
}

audio.ontimeupdate = function() {
    currTime.innerText = formatTime(audio.currentTime);
    if (!isNaN(audio.duration)) { durTime.innerText = formatTime(audio.duration); }
};

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
}

// Auto-play & Sakura Start
var stop, staticx;
var img = new Image();
img.src = "https://i.imgur.com/R9XUjfF.png";

function Sakura(x, y, s, r, fn) {
    this.x = x; this.y = y; this.s = s; this.r = r; this.fn = fn;
}
Sakura.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 40 * this.s / 4;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
    cxt.restore();
}
Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x'); this.y = 0; this.s = getRandom('s'); this.r = getRandom('r');
        } else {
            this.x = window.innerWidth; this.y = getRandom('y'); this.s = getRandom('s'); this.r = getRandom('r');
        }
    }
}
SakuraList = function() { this.list = []; }
SakuraList.prototype.push = function(sakura) { this.list.push(sakura); }
SakuraList.prototype.update = function() { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].update(); } }
SakuraList.prototype.draw = function(cxt) { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].draw(cxt); } }

function getRandom(option) {
    var ret, random;
    switch (option) {
        case 'x': ret = Math.random() * window.innerWidth; break;
        case 'y': ret = Math.random() * window.innerHeight; break;
        case 's': ret = Math.random(); break;
        case 'r': ret = Math.random() * 5; break;
        case 'fnx': random = -0.5 + Math.random() * 1; ret = function(x, y) { return x + 0.5 * random - 1; }; break;
        case 'fny': random = 0.5 + Math.random() * 0.5; ret = function(x, y) { return y + random; }; break;
        case 'fnr': random = Math.random() * 0.01; ret = function(r) { return r + random; }; break;
    }
    return ret;
}

function animateSakura() {
    var canvas = document.getElementById('canvas_sakura');
    if(canvas) {
        var cxt = canvas.getContext('2d');
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(animateSakura);
    }
}

var sakuraList;
function startSakura() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;z-index: 1;'); 
    canvas.setAttribute('id', 'canvas_sakura');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    sakuraList = new SakuraList();
    for (var i = 0; i < 50; i++) {
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
        randomX = getRandom('x'); randomY = getRandom('y'); randomR = getRandom('r'); randomS = getRandom('s');
        randomFnx = getRandom('fnx'); randomFny = getRandom('fny'); randomFnR = getRandom('fnr');
        sakura = new Sakura(randomX, randomY, randomS, randomR, { x: randomFnx, y: randomFny, r: randomFnR });
        sakura.draw(cxt);
        sakuraList.push(sakura);
    }
    animateSakura();
}
window.onresize = function() { var canvasSnow = document.getElementById('canvas_sakura'); if(canvasSnow) { canvasSnow.width = window.innerWidth; canvasSnow.height = window.innerHeight; } }

img.onload = function() { startSakura(); }

window.addEventListener('load', function() {
    var promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            disk.classList.add("rotating");
            playIcon.className = "fas fa-pause";
        }).catch(error => { console.log("Auto-play blocked."); });
    }
    document.body.addEventListener('click', function() {
        if (!audioInitialized) {
            initAudioContext();
            if (context.state === 'suspended') { context.resume(); }
        }
    }, { once: true });
});
