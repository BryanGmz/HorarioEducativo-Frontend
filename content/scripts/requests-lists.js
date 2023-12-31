const URI_API = "http://localhost:8000/";
const ASSIGNMENT_MODULE = "assignment/";
const CARRER_MODULE = "carrer/";
const COURSE_MODULE = "course/";
const CLASSROOM_MODULE = "classroom/";
const TEACHER_MODULE = "teacher/";
const SCHEDULE_MODULE = "schedule/";
const QUALIFICATION_MODULE = "qualification/";

function generateCell(value) {
    return "<td>" + value + "</td>";
} 

function get_informative_data() {
    $.ajax({
        url: URI_API + SCHEDULE_MODULE + "informative-data/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json', // Indicar el tipo de contenido como JSON
        success: function (data) {
            document.getElementById('informative-assigment-data').innerHTML = data.assigments;            
            document.getElementById('informative-carrer-data').innerHTML = data.carrers;
            document.getElementById('informative-course-data').innerHTML = data.courses
            document.getElementById('informative-classroom-data').innerHTML = data.classrooms;
            document.getElementById('informative-teacher-data').innerHTML = data.teachers;
            
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
        }
    });    
}

function fillTableQualifications(dpi) {
    document.getElementById('t-body').innerHTML = "";
    // Realizar una solicitud POST con jQuery
    $.ajax({
        url: URI_API + QUALIFICATION_MODULE + dpi + "/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json', // Indicar el tipo de contenido como JSON
        success: function (data) {
            // Obtener la referencia a la tabla
            var tbody = document.getElementById('t-body');

            // Recorrer los datos y agregar filas a la tabla
            data.qualifications.forEach((qualification) => {
                var fila = tbody.insertRow(); // Crear una nueva fila

                // Agregar celdas a la fila
                fila.insertCell(0).innerHTML = qualification.course_id;
                fila.insertCell(1).innerHTML = qualification.name;
                fila.insertCell(2).innerHTML =  generateCell(
                    "<div class=\"card\">" + 
                        "<div class=\"card-footer\">" + 
                            "<a onclick=\"deleteModule(" + qualification.id + ", " + 6 + ");\"class=\"card-footer-item\">Eliminar</a>" +
                        "</div>" + 
                    "</div>");
            });
            includeInformativeData("Cualificaciones - " + dpi, data.qualifications.length);
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
        }
    });    
}

function fillTable(module) {
    document.getElementById('t-body').innerHTML = "";
    // Realizar una solicitud POST con jQuery
    $.ajax({
        url: URI_API + module + "all/",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json', // Indicar el tipo de contenido como JSON
        success: function (data) {
            document.getElementById('t-body').innerHTML = "";            
            if (module == ASSIGNMENT_MODULE) {
                fillTableAssignment(data);
                includeInformativeData("Cursos con Asignación", data.assigments.length);
            } else if (module == CARRER_MODULE) {
                fillTableCarrer(data);
                includeInformativeData("Carreras", data.carrers.length);
            } else if (module == CLASSROOM_MODULE) {
                fillTableClassroom(data);
                includeInformativeData("Salones", data.classrooms.length);
            } else if (module == COURSE_MODULE) {
                fillTableCourses(data);
                includeInformativeData("Cursos", data.courses.length);
            } else {
                fillTableTeachers(data);
                includeInformativeData("Profesores", data.teachers.length);
            }
        },
        error: function (error) {
            // Función que se ejecutará si hay un error en la solicitud
            console.error('Error:', error);
        }
    });    
}

function fillTableAssignment(data) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body');

    // Recorrer los datos y agregar filas a la tabla
    data.assigments.forEach((assignment) => {
        var fila = tbody.insertRow(); // Crear una nueva fila
        console.log(assignment )
        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = assignment.course.name;
        fila.insertCell(1).innerHTML = assignment.carrer.name;
        fila.insertCell(2).innerHTML = assignment.section;
        fila.insertCell(3).innerHTML = assignment.year;
        fila.insertCell(4).innerHTML = assignment.course.semester == 1 ? "Primero" : "Segundo";
        fila.insertCell(5).innerHTML = assignment.assigned;
        fila.insertCell(6).innerHTML =  generateCell(
            "<div class=\"card\">" + 
                "<div class=\"card-footer\">" + 
                    "<a onclick=\"deleteModule(" + assignment.id_assignment + ", " + 1 + ");\"class=\"card-footer-item\">Eliminar</a>" +
                "</div>" + 
            "</div>");
    });
}

function fillTableCarrer(data) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body');

    // Recorrer los datos y agregar filas a la tabla
    data.carrers.forEach((carrer) => {
        var fila = tbody.insertRow(); // Crear una nueva fila

        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = carrer.id_carrer;
        fila.insertCell(1).innerHTML = carrer.name;
        fila.insertCell(2).innerHTML =  generateCell(
            "<div class=\"card\">" + 
                "<div class=\"card-footer\">" + 
                    "<a onclick=\"deleteModule(" + carrer.id_carrer + ", " + 2 + ");\" class=\"card-footer-item\">Eliminar</a>" +
                "</div>" + 
            "</div>");
    });
}

function fillTableClassroom(data) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body');

    // Recorrer los datos y agregar filas a la tabla
    data.classrooms.forEach((classroom) => {
        var fila = tbody.insertRow(); // Crear una nueva fila

        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = classroom.id_classroom;
        fila.insertCell(1).innerHTML = classroom.name;
        fila.insertCell(2).innerHTML = classroom.capacity;
        fila.insertCell(3).innerHTML =  generateCell(
            "<div class=\"card\">" + 
                "<div class=\"card-footer\">" + 
                    "<a onclick=\"deleteModule(" + classroom.id_classroom + ", " + 3 + ")\" class=\"card-footer-item\">Eliminar</a>" + 
                "</div>" + 
            "</div>");
    });
}

function fillTableCourses(data) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body');

    // Recorrer los datos y agregar filas a la tabla
    data.courses.forEach((course) => {
        var fila = tbody.insertRow(); // Crear una nueva fila

        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = course.id;
        fila.insertCell(1).innerHTML = course.name;
        fila.insertCell(2).innerHTML = course.carrer.name;
        fila.insertCell(3).innerHTML = course.semester == 1 ? "Primero" : "Segundo";
        fila.insertCell(4).innerHTML =  generateCell(
            "<div class=\"card\">" + 
                "<div class=\"card-footer\">" + 
                    "<a onclick=\"deleteModule(" + course.id + ", " + 4 + ")\" class=\"card-footer-item\">Eliminar</a>" + 
                "</div>" + 
            "</div>");
    });
}

function fillTableTeachers(data) {
    // Obtener la referencia a la tabla
    var tbody = document.getElementById('t-body');

    // Recorrer los datos y agregar filas a la tabla
    data.teachers.forEach((teacher) => {
        var fila = tbody.insertRow(); // Crear una nueva fila

        // Agregar celdas a la fila
        fila.insertCell(0).innerHTML = teacher.dpi_teacher;
        fila.insertCell(1).innerHTML = teacher.name;
        fila.insertCell(2).innerHTML = teacher.start_conntracting_hour;
        fila.insertCell(3).innerHTML = teacher.end_conntracting_hour;
        fila.insertCell(4).innerHTML =  generateCell(
            "<div class=\"card\">" + 
                "<div class=\"card-footer\">" + 
                    "<a onclick=\"goToQualification(" + teacher.dpi_teacher + ", " + 5 + ")\" class=\"card-footer-item\">Cualificaciones</a>" + 
                    "<a onclick=\"deleteModule(" + teacher.dpi_teacher + ", " + 5 + ")\" class=\"card-footer-item\">Eliminar</a>" + 
                "</div>" + 
            "</div>");
    });
}