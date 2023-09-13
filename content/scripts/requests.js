function createCarrer() {
    var name = document.getElementById('nombre').value;
    if (name == "") {
        alert("El nombre es requerido.")
    } else {
        var requestData = {
            "name": name,
        };
    
        $.ajax({
            url: URI_API + CARRER_MODULE,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', // Indicar el tipo de contenido como JSON
            data: JSON.stringify(requestData), // Convertir los datos a formato JSON
            success: function (data) {
                localStorage.setItem("create-success", true);
                window.location.href = "/HorarioEducativo-Frontend/views/carrer/home.html"
            },
            error: function (error) {
                // Función que se ejecutará si hay un error en la solicitud
                console.error('Error:', error);
                localStorage.setItem("create-success", false);
            }
        });  
    }
}

function createAssignment() {
    var course = document.getElementById('select-course').value;
    var assigment = document.getElementById('asignados').value;
    var year = document.getElementById('anio').value;
    var section = document.getElementById('seccion').value;
    var semester = document.getElementById('select-semester').value;

    if (course == "" || assigment == "" || year == "" || section == "" || semester == "") {
        alert("Todos los datos son requeridos.")
    } else {
        var requestData = {
            "id_course": course,
            "year": year,
            "semester": semester,
            "section": section,
            "assignment": assigment,
        };
    
        $.ajax({
            url: URI_API + ASSIGNMENT_MODULE,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', // Indicar el tipo de contenido como JSON
            data: JSON.stringify(requestData), // Convertir los datos a formato JSON
            success: function (data) {
                localStorage.setItem("create-success", true);
                window.location.href = "/HorarioEducativo-Frontend/views/assignation/home.html"
            },
            error: function (error) {
                // Función que se ejecutará si hay un error en la solicitud
                console.error('Error:', error);
                localStorage.setItem("create-success", false);
            }
        });    
    }
}

function createCourse() {
    var carrer = document.getElementById('select-carrer').value;
    var name = document.getElementById('nombre').value;
    var semester = document.getElementById('select-semester').value;
    
    if (name == "" || semester == "" || carrer == "") {
        alert("Todos los datos son requeridos.")
    } else {
        var requestData = {
            "name": name,
            "semester": semester,
            "carrer_id": carrer,
        };
    
        $.ajax({
            url: URI_API + COURSE_MODULE,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', // Indicar el tipo de contenido como JSON
            data: JSON.stringify(requestData), // Convertir los datos a formato JSON
            success: function (data) {
                localStorage.setItem("create-success", true);
                window.location.href = "/HorarioEducativo-Frontend/views/course/home.html"
            },
            error: function (error) {
                // Función que se ejecutará si hay un error en la solicitud
                console.error('Error:', error);
                localStorage.setItem("create-success", false);
            }
        });  
    }
}

function deleteModule(id, id_module) {
    var module = "";
    switch(id_module) {
        case 1:
            module = ASSIGNMENT_MODULE;
            break;
        case 2:
            module = CARRER_MODULEE;
            break;
        case 3:
            module = CLASSROOM_MODULE;
            break;
        case 4:
            module = COURSE_MODULE;
            break;
        default:
            module = TEACHER_MODULE;
            break;
    }

    $.ajax({
        url: URI_API + module + id + "/",
        type: 'DELETE',
        success: function (data) {
            localStorage.setItem("delete-success", true);
            window.location.reload();
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
            localStorage.setItem("delete-success", false);
            window.location.reload();
        }
    });    
}

function getCourses() {
    var selected = document.getElementById('select-course');
    selected.innerHTML = "";
    // Realizar una solicitud POST con jQuery
    $.ajax({
        url: URI_API + COURSE_MODULE + "all/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json', // Indicar el tipo de contenido como JSON
        success: function (data) {
            if (data.courses.length > 0) {
                for (var i = 0; i < data.courses.length; i++) {
                    var optionElement = document.createElement('option');
                    optionElement.value = data.courses[i].id;
                    optionElement.text = data.courses[i].name;
                    if (i == 0) {
                        optionElement.selected = true;
                    }
                    selected.appendChild(optionElement);    
                }
            }
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
        }
    });    
}

function getCarrers() {
    var selected = document.getElementById('select-carrer');
    selected.innerHTML = "";
    // Realizar una solicitud POST con jQuery
    $.ajax({
        url: URI_API + CARRER_MODULE + "all/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json', // Indicar el tipo de contenido como JSON
        success: function (data) {
            if (data.carrers.length > 0) {
                for (var i = 0; i < data.carrers.length; i++) {
                    var optionElement = document.createElement('option');
                    optionElement.value = data.carrers[i].id_carrer;
                    optionElement.text = data.carrers[i].name;
                    if (i == 0) {
                        optionElement.selected = true;
                    }
                    selected.appendChild(optionElement);    
                }
            }
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
        }
    });    
}