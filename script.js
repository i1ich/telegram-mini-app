let tg = window.Telegram.WebApp;

tg.expand();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timeButton').addEventListener('click', function() {
        tg.sendData('get_time111');
    });
});