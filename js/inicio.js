define(["require", "exports", "jquery"], function (require, exports, jQuery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = jQuery;
    var regiones = [
        {
            "nombre": "Antofagasta",
            "idRegion": 2,
            "comunas": [
                {
                    "nombreComuna": "Antofagasta",
                    "idComuna": 1
                },
                {
                    "nombreComuna": "Mejillones",
                    "idComuna": 2
                }
            ]
        },
        {
            "nombre": "Valparaíso",
            "idRegion": 0,
            "comunas": [
                {
                    "nombreComuna": "Villa Alemana",
                    "idComuna": 1
                },
                {
                    "nombreComuna": "Quilpué",
                    "idComuna": 2
                },
                {
                    "nombreComuna": "Limache",
                    "idComuna": 3
                }
            ]
        },
        {
            "nombre": "RM",
            "idRegion": 1,
            "comunas": [
                {
                    "nombreComuna": "Santiago",
                    "idComuna": 1
                },
                {
                    "nombreComuna": "Quilicura",
                    "idComuna": 2
                },
                {
                    "nombreComuna": "Las Condes",
                    "idComuna": 3
                }
            ]
        }
    ];
    var pacientes = [
        {
            "nombre": "Pepito Pérez",
            "id": 0,
            "fechaNacimiento": "1979-09-21",
            "correo": "",
            "telefono": "",
            "genero": "Masculino",
            "rut": "",
            "region": "",
            "comuna": "",
            "estatura": 1.75,
            "peso": 70,
            "frecuenciaCardiaca": 70,
            "antecedentes": [
                {
                    "motivo": "bronquitis",
                    "fecha": "2020-10-20"
                },
                {
                    "motivo": "intoxicacion",
                    "fecha": "2009-01-20"
                },
                {
                    "motivo": "XXXXXX",
                    "fecha": "2020-10-20"
                }
            ]
        }
    ];
    function ValidarRut(valor) {
        var tmp = valor.split('-');
        var digito = tmp[1];
        var rut = tmp[0];
        if (digito == 'K')
            digito = 'k';
        var M = 0, S = 1;
        for (; rut; rut = Math.floor(rut / 10))
            S = (S + rut % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
    function cargarRegiones() {
        var selectorRegion = document.getElementById("region");
        for (var i = 0; i < regiones.length; i++) {
            var opcion = document.createElement("option");
            opcion.text = regiones[i].nombre;
            selectorRegion.add(opcion);
        }
    }
    function cargarComunas() {
        var selectorComuna = document.getElementById("comuna");
        var regionSeleccionada = document.getElementById('region').value;
        limpiarComunas(selectorComuna);
        for (var i = 0; i < regiones.length; i++) {
            if (regiones[i].nombre === regionSeleccionada) {
                for (var j = 0; j < regiones[i].comunas.length; j++) {
                    var opcion = document.createElement("option");
                    opcion.text = regiones[i].comunas[j].nombreComuna;
                    selectorComuna.add(opcion);
                }
            }
        }
    }
    ;
    function limpiarComunas(comunas) {
        while (comunas.options.length > 0) {
            comunas.remove(0);
        }
    }
    function cargarDatos() {
        var camposEditables = document.getElementsByName('campoInfo');
        camposEditables[0].value = pacientes[0].nombre;
        var hoy = new Date();
        var birthDate = new Date(pacientes[0].fechaNacimiento);
        var edad = hoy.getFullYear() - birthDate.getFullYear();
        camposEditables[1].value = edad;
        var genero = document.getElementById('genero');
        genero.value = pacientes[0].genero;
        var fechanacimiento = document.getElementById('fechanacimiento');
        fechanacimiento.value = pacientes[0].fechaNacimiento;
        camposEditables[2].value = pacientes[0].correo;
        camposEditables[3].value = pacientes[0].telefono;
        camposEditables[4].value = pacientes[0].rut;
        var region = document.getElementById('region');
        var comuna = document.getElementById('comuna');
        region.value = pacientes[0].region;
        comuna.value = pacientes[0].comuna;
        var estatura = document.getElementById('estatura');
        var peso = document.getElementById('peso');
        var frecuencia = document.getElementById('frecuencia');
        estatura.value = pacientes[0].estatura + 'm';
        peso.value = pacientes[0].peso + 'Kg';
        frecuencia.value = pacientes[0].frecuenciaCardiaca;
    }
    function validarDatos() {
        var camposEditables = document.getElementsByName('campoInfo');
        var genero = document.getElementById('genero');
        var rut = document.getElementById('rut');
        var fechanacimiento = document.getElementById('fechanacimiento');
        var region = document.getElementById('region');
        var comuna = document.getElementById('comuna');
        var estatura = document.getElementById('estatura');
        var peso = document.getElementById('peso');
        var frecuencia = document.getElementById('frecuencia');
        if (estatura.value === "") {
            estatura.setCustomValidity('invalid');
        }
        else {
            estatura.setCustomValidity('');
        }
        if (peso.value === "") {
            peso.setCustomValidity('invalid');
        }
        else {
            peso.setCustomValidity('');
        }
        if (frecuencia.value === "") {
            frecuencia.setCustomValidity('invalid');
        }
        else {
            frecuencia.setCustomValidity('');
        }
        for (var i = 0; i < camposEditables.length; i++) {
            if (camposEditables[i].value === "") {
                camposEditables[i].setCustomValidity('invalid');
            }
            else {
                camposEditables[i].setCustomValidity('');
            }
        }
        if (genero.value === "") {
            genero.setCustomValidity('invalid');
        }
        else {
            genero.setCustomValidity('');
        }
        if (fechanacimiento.value === "") {
            fechanacimiento.setCustomValidity('invalid');
        }
        else {
            fechanacimiento.setCustomValidity('');
        }
        if (region.value === "") {
            region.setCustomValidity('invalid');
        }
        else {
            region.setCustomValidity('');
        }
        if (comuna.value === "") {
            comuna.setCustomValidity('invalid');
        }
        else {
            comuna.setCustomValidity('');
        }
        var rutVal = rut.value;
        rutVal = parseInt(rutVal.slice(rutVal.length - 1), 10);
        if (rutVal === ValidarRut(rut.value)) {
            rut.setCustomValidity('');
        }
        else {
            rut.setCustomValidity('invalid');
            var rutInvalido = document.getElementById('invalido');
            if ((rutInvalido === null || rutInvalido === void 0 ? void 0 : rutInvalido.hidden) === true) {
                rutInvalido.hidden = false;
            }
        }
    }
    function cargarAntecedentes() {
        for (var i = 0; i < pacientes[0].antecedentes.length; i++) {
            var antecedentes = document.getElementById('antecedentes');
            var nuevoAntecedente = document.createElement('div');
            nuevoAntecedente.className = 'row';
            var columnaAntecedente1 = document.createElement('div');
            columnaAntecedente1.className = 'col-9 antecedente';
            var columnaAntecedente2 = document.createElement('div');
            columnaAntecedente2.className = 'col-2 botonEliminar';
            var filaAntecedente1 = document.createElement('div');
            filaAntecedente1.className = 'row';
            var iconoEliminar = document.createElement('span');
            iconoEliminar.className = 'material-icons iconoEliminar';
            iconoEliminar.innerHTML = 'delete';
            var filaAntecedente2 = document.createElement('div');
            filaAntecedente2.className = 'row';
            filaAntecedente2.innerHTML = 'Eliminar';
            filaAntecedente1.append(iconoEliminar);
            columnaAntecedente2.append(filaAntecedente1);
            columnaAntecedente2.append(filaAntecedente2);
            nuevoAntecedente.append(columnaAntecedente1);
            nuevoAntecedente.append(columnaAntecedente2);
            columnaAntecedente1.innerHTML = '<p>Hospitalizado por ' + pacientes[0].antecedentes[i].motivo + '</p><p>' + pacientes[0].antecedentes[i].fecha + '</p>';
            antecedentes.append(nuevoAntecedente);
        }
    }
    function mostrarFormularioNuevoAntecedente() {
        var formularioAntecedente = document.getElementById('contenedorFormularioAntecedentes');
        if (formularioAntecedente.hidden === true) {
            formularioAntecedente.hidden = false;
        }
        else {
            formularioAntecedente.hidden = true;
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
    function agregarNuevoAntecedente() {
        var nuevoMotivo = document.getElementById('motivo');
        var valorMotivo = nuevoMotivo.value;
        var nuevaFecha = document.getElementById('fechahospitalizacion');
        var valorFecha = nuevaFecha.value;
        var antecedentes = document.getElementById('antecedentes');
        var nuevoAntecedente = document.createElement('div');
        nuevoAntecedente.className = 'row';
        var columnaAntecedente1 = document.createElement('div');
        columnaAntecedente1.className = 'col-9 antecedente';
        var columnaAntecedente2 = document.createElement('div');
        columnaAntecedente2.className = 'col-2 botonEliminar';
        var filaAntecedente1 = document.createElement('div');
        filaAntecedente1.className = 'row';
        var iconoEliminar = document.createElement('span');
        iconoEliminar.className = 'material-icons iconoEliminar';
        iconoEliminar.id = 'btnEliminar';
        iconoEliminar.innerHTML = 'delete';
        iconoEliminar.onclick = 'removerAntecedente()';
        var filaAntecedente2 = document.createElement('div');
        filaAntecedente2.className = 'row';
        filaAntecedente2.innerHTML = 'Eliminar';
        filaAntecedente1.append(iconoEliminar);
        columnaAntecedente2.append(filaAntecedente1);
        columnaAntecedente2.append(filaAntecedente2);
        nuevoAntecedente.append(columnaAntecedente1);
        nuevoAntecedente.append(columnaAntecedente2);
        columnaAntecedente1.innerHTML = '<p>Hospitalizado por ' + valorMotivo + '</p><p>' + valorFecha + '</p>';
        antecedentes.append(nuevoAntecedente);
    }
    (function () {
        var _a;
        window.addEventListener("DOMContentLoaded", cargarRegiones);
        window.addEventListener("load", cargarAntecedentes);
        window.addEventListener("load", cargarDatos);
        (_a = document.getElementById("region")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", cargarComunas);
        var btnSubmit = document.getElementById('botonSubmit');
        btnSubmit.addEventListener('click', validarDatos);
        var btnMostrarFormularioNuevoAntecedente = document.getElementById('botonMostrarFormularioNuevoAntecedente');
        btnMostrarFormularioNuevoAntecedente.addEventListener('click', mostrarFormularioNuevoAntecedente);
        var btnSubmitAntecedente = document.getElementById('botonSubmitAntecedente');
        btnSubmitAntecedente.addEventListener('click', agregarNuevoAntecedente);
    })();
    (function () {
        'use strict';
        var forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
});
