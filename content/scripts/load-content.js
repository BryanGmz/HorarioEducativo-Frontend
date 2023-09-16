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

function addMetrics(metricName, nameContent) {
    var metrics = JSON.parse(localStorage.getItem(metricName));
    var divContent = document.getElementById(nameContent);
    var content = "";
    metrics.forEach((metric) => {
        content += 
        "<p class=\"subtitle\">" + metric.percentage + "% de " + metric.name + " Asignados</p>" +
        "<ul>" + 
            "<li><strong>Disponibles:</strong> " + metric.real_value + "</li>" +
            "<li><strong>Sin Asignar:</strong> " + metric.avaible_value + "</li>" +
        "</ul> ";
    });
    divContent.innerHTML = content;
}

function fillTableUnassigned(unassigneds) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body-unassigned');
    tbody.innerHTML = "";
    // Recorrer los datos y agregar filas a la tabla
    unassigneds.forEach((unassigned) => {
        var fila = tbody.insertRow(); // Crear una nueva fila

        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = unassigned.course.id;
        fila.insertCell(1).innerHTML = unassigned.course.name;
        fila.insertCell(2).innerHTML = unassigned.carrer.name;
        fila.insertCell(3).innerHTML = unassigned.assigned;
        fila.insertCell(4).innerHTML = unassigned.section;
        fila.insertCell(5).innerHTML = unassigned.year;
        fila.insertCell(6).innerHTML = unassigned.warning;
    });
}