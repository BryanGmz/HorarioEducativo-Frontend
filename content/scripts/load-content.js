function include(elementId, path){
    return new Promise((resolve, reject) => {
        const element = document.getElementById(elementId);
        if (element) {
            fetch(path)
                .then(response => response.text())
                .then(data => {
                    element.innerHTML = data + element.innerHTML;
                    resolve(); // Resolvemos la promesa cuando la inclusión se completa
                })
                .catch(error => {
                    console.error('Error al cargar el contenido:', error);
                    reject(error); // Rechazamos la promesa en caso de error
                });
        } else {
            console.error('Elemento no encontrado:', elementId);
            reject('Elemento no encontrado'); // Rechazamos la promesa si el elemento no se encuentra
        }
    });
}

function includeNotification(module) {
    addText("text-error", module);
    addText("text-success", module);
    addText("delete-text-error", module);
    addText("delete-text-success", module);
}

function includeInformativeData(module, quantity) {
    addText("title-home", module);
    addText("quantity-home", quantity);
}

function loadHeadTable(list) {
    // Agregando encabezados 
    var encabezadoRow = document.getElementById('t-head');

    encabezadoRow.innerHTML = "";
    list.forEach((item) => { 
        encabezadoRow.innerHTML += 
        "<th>" 
            + item 
            + "</th>";
        ;
    });
}

function addText(idElement, text) {
    document.getElementById(idElement).textContent = text;
}

function addReference(idElement, href) {
    document.getElementById(idElement).href = href
}

function hideNotification() {
    document.getElementById('error-notification').style.display = 'none';
    document.getElementById('success-notification').style.display = 'none';
    document.getElementById('delete-error-notification').style.display = 'none';
    document.getElementById('delete-success-notification').style.display = 'none';
}

function addNotification(id_local_storage){
    var data = localStorage.getItem(id_local_storage);
    if (data != undefined) {
        var value = (String(data).toLowerCase() === 'true');
        var errorNotification = document.getElementById('error-notification');
        var successNotification = document.getElementById('success-notification');
        if (value) {
            errorNotification.style.display = 'none';
            successNotification.style.display = 'inline';
        } else {
            errorNotification.style.display = 'inline';
            successNotification.style.display = 'none';
        }
    }
    localStorage.removeItem(id_local_storage);
}

function addNotificationDelete(id_local_storage){
    var data = localStorage.getItem(id_local_storage);
    if (data != undefined) {
        var value = (String(data).toLowerCase() === 'true');
        var deleteErrorNotification = document.getElementById('delete-error-notification');
        var deleteSuccessNotification = document.getElementById('delete-success-notification');
        if (value) {
            deleteErrorNotification.style.display = 'none';
            deleteSuccessNotification.style.display = 'inline';
        } else {
            deleteErrorNotification.style.display = 'inline';
            deleteSuccessNotification.style.display = 'none';
        }
    }
    localStorage.removeItem(id_local_storage);
}