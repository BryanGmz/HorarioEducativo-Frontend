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