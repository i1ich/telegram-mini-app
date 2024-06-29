let tg = window.Telegram.WebApp;
tg.expand();

document.addEventListener('DOMContentLoaded', function() {
    function addButtonListener(id, command, inputId = null) {
        document.getElementById(id).addEventListener('click', function() {
            let data = [command];
            if (inputId) {
                let inputValue = document.getElementById(inputId).value.trim();
                if (inputValue) {
                    if (command === 'rename') {
                        // Для команды rename разделяем ввод на старое и новое имя
                        data = data.concat(inputValue.split(',').map(item => item.trim()));
                    } else {
                        data.push(inputValue);
                    }
                }
            }
            tg.sendData(JSON.stringify(data));
        });
    }

    addButtonListener('startButton', 'start');
    addButtonListener('mdButton', 'md', 'mdInput');
    addButtonListener('cdButton', 'cd', 'cdInput');
    addButtonListener('lsButton', 'ls');
    addButtonListener('touchButton', 'touch');
    addButtonListener('getButton', 'get', 'getInput');
    addButtonListener('delButton', 'del', 'delInput');
    addButtonListener('renameButton', 'rename', 'renameInput');
    addButtonListener('timeButton', 'get_time');
});