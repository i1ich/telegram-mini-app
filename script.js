let tg = window.Telegram.WebApp;

tg.expand();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timeButton').addEventListener('click', function() {
        tg.sendData(JSON.stringify('get_time'));
    });
});