import jQuery= require('jquery');
const $:JQueryStatic=jQuery;

let regiones = [
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


let pacientes = [
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
function ValidarRut(valor:any){
    var tmp=valor.split('-');
    let digito=tmp[1];
    let rut=tmp[0];
    if(digito=='K') digito='k';
    var M=0,S=1;
    for(;rut;rut=Math.floor(rut/10))
      S=(S+rut%10*(9-M++%6))%11;

   return S?S-1:'k';
}
function cargarRegiones(){    
    let selectorRegion:any = document.getElementById("region");         
    for (let i=0;i<regiones.length;i++){        
        let opcion:any = document.createElement("option");
        opcion.text = regiones[i].nombre;
        selectorRegion.add(opcion);        
    }
}

function cargarComunas(){
    let selectorComuna:any = document.getElementById("comuna");     
    let regionSeleccionada = (<HTMLSelectElement>document.getElementById('region')).value;    
    limpiarComunas(selectorComuna);
    for (let i=0;i<regiones.length;i++){        
        if (regiones[i].nombre === regionSeleccionada){
            for (let j=0;j<regiones[i].comunas.length;j++){        
                let opcion:any = document.createElement("option");
                opcion.text = regiones[i].comunas[j].nombreComuna;
                selectorComuna.add(opcion);
            }
        }
    }    
};

function limpiarComunas(comunas:any) {
    while (comunas.options.length > 0) {
        comunas.remove(0);
    }
}


function cargarDatos(){
    let camposEditables:any = document.getElementsByName('campoInfo');    
    camposEditables[0].value = pacientes[0].nombre;

    let hoy = new Date();
    let birthDate = new Date(pacientes[0].fechaNacimiento);
    let edad = hoy.getFullYear() - birthDate.getFullYear();        
    camposEditables[1].value = edad;
    
    let genero:any = document.getElementById('genero');
    genero.value = pacientes[0].genero;

    let fechanacimiento:any = document.getElementById('fechanacimiento');
    fechanacimiento.value = pacientes[0].fechaNacimiento;

    camposEditables[2].value = pacientes[0].correo;
    camposEditables[3].value = pacientes[0].telefono;
    camposEditables[4].value = pacientes[0].rut;

    let region:any = document.getElementById('region');
    let comuna:any = document.getElementById('comuna');    
    region.value = pacientes[0].region;
    comuna.value = pacientes[0].comuna;

    let estatura:any = document.getElementById('estatura');   
    let peso:any = document.getElementById('peso');   
    let frecuencia:any = document.getElementById('frecuencia'); 
    estatura.value = pacientes[0].estatura + 'm';
    peso.value = pacientes[0].peso + 'Kg';
    frecuencia.value = pacientes[0].frecuenciaCardiaca;

}

function validarDatos(){
    let camposEditables:any = document.getElementsByName('campoInfo');
    let genero:any = document.getElementById('genero');
    let rut:any = document.getElementById('rut');
    let fechanacimiento:any = document.getElementById('fechanacimiento');
    let region:any = document.getElementById('region');
    let comuna:any = document.getElementById('comuna');    
    let estatura:any = document.getElementById('estatura');   
    let peso:any = document.getElementById('peso');   
    let frecuencia:any = document.getElementById('frecuencia'); 
    
    if (estatura.value === "") {
        estatura.setCustomValidity('invalid');            
    } else {
        estatura.setCustomValidity('');                
    }
    if (peso.value === "") {
        peso.setCustomValidity('invalid');            
    } else {
        peso.setCustomValidity('');                
    }
    if (frecuencia.value === "") {
        frecuencia.setCustomValidity('invalid');            
    } else {
        frecuencia.setCustomValidity('');                
    }
    
    for (let i = 0; i < camposEditables.length; i++) {
        if (camposEditables[i].value === ""){
            camposEditables[i].setCustomValidity('invalid');            
        }
        else {
            camposEditables[i].setCustomValidity('');            
        }        
    }
    if (genero.value === ""){
        genero.setCustomValidity('invalid');            
    } else {
        genero.setCustomValidity('');            
    }
    if (fechanacimiento.value === ""){
        fechanacimiento.setCustomValidity('invalid');            
    } else {
        fechanacimiento.setCustomValidity('');            
    }
    if (region.value === ""){
        region.setCustomValidity('invalid');            
    } else {
        region.setCustomValidity('');            
    }
    if (comuna.value === ""){
        comuna.setCustomValidity('invalid');            
    } else {
        comuna.setCustomValidity('');            
    }
    
    
    let rutVal = rut.value;
    rutVal = parseInt(rutVal.slice(rutVal.length - 1),10);

    if (rutVal === ValidarRut(rut.value)){
        rut.setCustomValidity('');            
    } else {
        rut.setCustomValidity('invalid');   
        let rutInvalido = document.getElementById('invalido');
        if (rutInvalido?.hidden ===  true){
            rutInvalido.hidden = false;                        
        }
    }
    
}

function cargarAntecedentes(){

    for (let i = 0; i < pacientes[0].antecedentes.length; i++) {
        
        let antecedentes:any = document.getElementById('antecedentes');
    
        let nuevoAntecedente:any = document.createElement('div');
        nuevoAntecedente.className = 'row';    
    
        let columnaAntecedente1:any = document.createElement('div');
        columnaAntecedente1.className = 'col-9 antecedente';
    
        let columnaAntecedente2:any = document.createElement('div');
        columnaAntecedente2.className = 'col-2 botonEliminar';
    
        let filaAntecedente1:any = document.createElement('div');
        filaAntecedente1.className = 'row';
        let iconoEliminar:any = document.createElement('span');
        iconoEliminar.className = 'material-icons iconoEliminar';
        iconoEliminar.innerHTML = 'delete'
    
        let filaAntecedente2:any = document.createElement('div');
        filaAntecedente2.className = 'row';
        filaAntecedente2.innerHTML = 'Eliminar';
    
        filaAntecedente1.append(iconoEliminar);
        columnaAntecedente2.append(filaAntecedente1);
        columnaAntecedente2.append(filaAntecedente2);
    
        
    
        nuevoAntecedente.append(columnaAntecedente1);
        nuevoAntecedente.append(columnaAntecedente2);
        columnaAntecedente1.innerHTML = '<p>Hospitalizado por '+ pacientes[0].antecedentes[i].motivo+'</p><p>'+pacientes[0].antecedentes[i].fecha+'</p>';
        antecedentes.append(nuevoAntecedente);
        
    }

}


function mostrarFormularioNuevoAntecedente(){
    let formularioAntecedente:any = document.getElementById('contenedorFormularioAntecedentes');
    if (formularioAntecedente.hidden === true){
        formularioAntecedente.hidden = false;
    } else {
        formularioAntecedente.hidden = true;
    }    
    window.scrollTo(0,document.body.scrollHeight);
}

function agregarNuevoAntecedente(){
    let nuevoMotivo:any = document.getElementById('motivo');    
    let valorMotivo = nuevoMotivo.value;
    let nuevaFecha:any = document.getElementById('fechahospitalizacion');    
    let valorFecha = nuevaFecha.value;

    let antecedentes:any = document.getElementById('antecedentes');
    
    let nuevoAntecedente:any = document.createElement('div');
    nuevoAntecedente.className = 'row';    

    let columnaAntecedente1:any = document.createElement('div');
    columnaAntecedente1.className = 'col-9 antecedente';

    let columnaAntecedente2:any = document.createElement('div');
    columnaAntecedente2.className = 'col-2 botonEliminar';

    let filaAntecedente1:any = document.createElement('div');
    filaAntecedente1.className = 'row';
    let iconoEliminar:any = document.createElement('span');
    iconoEliminar.className = 'material-icons iconoEliminar';
    iconoEliminar.id = 'btnEliminar';
    iconoEliminar.innerHTML = 'delete';
    iconoEliminar.onclick = 'removerAntecedente()';

    let filaAntecedente2:any = document.createElement('div');
    filaAntecedente2.className = 'row';
    filaAntecedente2.innerHTML = 'Eliminar';

    filaAntecedente1.append(iconoEliminar);
    columnaAntecedente2.append(filaAntecedente1);
    columnaAntecedente2.append(filaAntecedente2);

    

    nuevoAntecedente.append(columnaAntecedente1);
    nuevoAntecedente.append(columnaAntecedente2);
    columnaAntecedente1.innerHTML = '<p>Hospitalizado por '+ valorMotivo+'</p><p>'+valorFecha+'</p>';
    antecedentes.append(nuevoAntecedente);  


}



(function(){
    window.addEventListener("DOMContentLoaded",cargarRegiones);
    window.addEventListener("load",cargarAntecedentes);
    window.addEventListener("load",cargarDatos);
    document.getElementById("region")?.addEventListener("click",cargarComunas);
    let btnSubmit:any = document.getElementById('botonSubmit');
    btnSubmit.addEventListener('click',validarDatos);
    
    let btnMostrarFormularioNuevoAntecedente:any = document.getElementById('botonMostrarFormularioNuevoAntecedente');
    btnMostrarFormularioNuevoAntecedente.addEventListener('click',mostrarFormularioNuevoAntecedente);
    
    let btnSubmitAntecedente:any = document.getElementById('botonSubmitAntecedente');
    btnSubmitAntecedente.addEventListener('click',agregarNuevoAntecedente);
    
    
})();




(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event:any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }  
          form.classList.add('was-validated')
        }, false)
      })
  })()