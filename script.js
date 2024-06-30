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
	
	tg.onEvent('webapp_data_received', function(event) {
        try {
            let data = JSON.parse(event.data);
            if (data.command === 'ls_result') {
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
        } catch (e) {
            console.error('Ошибка при обработке данных:', e);
        }
    });
	
	function updateDirectoryContents(data) {
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

    // Получаем начальные данные из URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialData = urlParams.get('initial_data');
    if (initialData) {
        try {
            const data = JSON.parse(decodeURIComponent(initialData));
            if (data.command === 'initial_ls') {
                updateDirectoryContents(data);
            }
        } catch (e) {
            console.error('Ошибка при обработке начальных данных:', e);
        }
    }

    // Обработчик для получения сообщений от бота
    tg.onEvent('message', function(event) {
        try {
            let data = JSON.parse(event.text);
            if (data.command === 'ls_result') {
                updateDirectoryContents(data);
            }
        } catch (e) {
            console.error('Ошибка при обработке сообщения:', e);
        }
    });
});