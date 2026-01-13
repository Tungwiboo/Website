//////////////////////////////////////////////////////////////
function onCreate() {
    ShowToast();
}
//▬▬▬▬▬▬▬▬▬▬
// TOAST (Thông báo)
//▬▬▬▬▬▬▬▬▬▬
function ShowToast() {
    var x = document.getElementById("Toast");
    if (x) {
        x.className = "show";
        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3900);
    }
}
//▬▬▬▬▬▬▬▬▬▬
// FPS WEBS (Đếm khung hình)
//▬▬▬▬▬▬▬▬▬▬
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

//▬▬▬▬▬▬▬▬▬▬
// LINK (Mở tab mới)
//▬▬▬▬▬▬▬▬▬▬
function Youtube() {
    window.open('https://youtube.com/@tungwiboo?si=YivDvtiS8QjQ_YuH', '_blank');
}

function Facebook() {
    window.open('https://www.facebook.com/tungwiboo', '_blank');
}

function Discord() {
    window.open('https://discord.gg/s5vagyAy8', '_blank');
}

function Zalo() {
    window.open('https://zalo.me/0364914860/', '_blank');
}

function DarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//▬▬▬▬▬▬▬▬▬▬
// QR CODE SLIDE (Hiệu ứng trượt QR)
//▬▬▬▬▬▬▬▬▬▬
function ToggleQR(id) {
    var qrBox = document.getElementById(id);
    if (qrBox) {
        // Toggle class 'show' để kích hoạt CSS trượt
        if (qrBox.classList.contains("show")) {
            qrBox.classList.remove("show");
        } else {
            // (Tùy chọn) Nếu muốn bấm cái này tự đóng cái kia thì bỏ comment dòng dưới
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
// HOA ANH DAO (Giữ nguyên code cũ dạng comment)
//▬▬▬▬▬▬▬▬▬▬
/*
var stop, staticx;
var img = new Image();
img.src = "https://i.imgur.com/R9XUjfF.png";
... (Code cũ của bạn) ...
*///////////////////////////////
