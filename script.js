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
	
	tg.onEvent('webapp_data_sent', function(event) {
        let data = JSON.parse(event.data);
        if (data.directories && data.files) {
            let contentDiv = document.getElementById('directoryContents');
            contentDiv.innerHTML = '<h2>Содержимое директории:</h2>';
            
            data.directories.forEach(function(dir) {
                contentDiv.innerHTML += `<p class="directory">📁 ${dir}</p>`;
            });
            
            data.files.forEach(function(file) {
                contentDiv.innerHTML += `<p class="file">📄 ${file}</p>`;
            });
            
            if (data.directories.length === 0 && data.files.length === 0) {
                contentDiv.innerHTML += '<p>Директория пуста.</p>';
            }
        }
    });
});