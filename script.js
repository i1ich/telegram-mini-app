let tg = window.Telegram.WebApp;
tg.expand();

document.addEventListener('DOMContentLoaded', function() {
    function addButtonListener(id, command) {
        document.getElementById(id).addEventListener('click', function() {
            tg.sendData(command);
        });
    }

    addButtonListener('startButton', 'start');
    addButtonListener('mdButton', 'md');
    addButtonListener('cdButton', 'cd');
    addButtonListener('lsButton', 'ls');
    addButtonListener('touchButton', 'touch');
    addButtonListener('getButton', 'get');
    addButtonListener('delButton', 'del');
    addButtonListener('renameButton', 'rename');
    addButtonListener('timeButton', 'get_time');
});