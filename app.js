class Alimento {
  constructor(nombre, cantidad, calorias, proteinas) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.calorias = calorias;
    this.proteinas = proteinas;
  }
}

class Fruta extends Alimento {
  constructor(
    nombre,
    cantidad,
    calorias,
    proteinas,

    conservacion
  ) {
    super(nombre, cantidad, calorias, proteinas);
    this.conservacion = conservacion;
  }
}

class Verdura extends Alimento {
  constructor(nombre, cantidad, calorias, proteinas, frescas) {
    super(nombre, cantidad, calorias, proteinas, carbohidratos);
    this.frescas = frescas;
  }
}

// Instancias de las clases

// Tres instancias adicionales de la clase Alimento
const Alimento1 = new Alimento("Lácteos", "1", "30", "5");
const Alimento2 = new Alimento("Cereales", "1", "10", "45");
const Alimento3 = new Alimento("Legumbres", "1", "40", "8");

// Tres instancias adicionales de la clase Fruta
const Fruta1 = new Fruta(
  "Pera",
  "1",
  "34",
  "30",
  "Conservar en nevera siempre"
);
const Fruta2 = new Fruta(
  "Manzana",
  "1",
  "86",
  "46",
  "Conservar en nevera siempre"
);
const Fruta3 = new Fruta(
  "Naranja",
  "1",
  "67",
  "15",
  "Conservar en nevera siempre"
);
const Fruta4 = new Fruta(
  "Platano",
  "1",
  "45",
  "32",
  "Conservar en nevera siempre"
);
const Fruta5 = new Fruta(
  "Melcoton",
  "1",
  "30",
  "56",
  "Conservar en nevera siempre"
);

// Tres instancias adicionales de la clase Verduras
const Verdura1 = new Fruta(
  "Coliflor",
  "1",
  "45",
  "36",
  "Consume mejor verduras frescas"
);

const Verdura2 = new Fruta(
  "Zanahoria",
  "1",
  "65",
  "16",
  "Consume mejor verduras frescas"
);

const Verdura3 = new Fruta(
  "Berenjena",
  "1",
  "32",
  "56",
  "Consume mejor verduras frescas"
);

const alimentos = [
  Alimento1,
  Alimento2,
  Alimento3,
  Fruta1,
  Fruta2,
  Fruta3,
  Fruta4,
  Fruta5,
  Verdura1,
  Verdura2,
  Verdura3,
];

document.addEventListener("DOMContentLoaded", function () {
  const alimentosSection = document.getElementById("alimentos");
  const resultadosSection = document.getElementById("resultados");
  const resultadosComparacion = document.getElementById("resultadosCalculo");

  let cantidadTotalMax = 0;

  // Función para agregar campo de destino
  function agregarCampoDestino() {
    const nuevoCampo = document.createElement("div");
    nuevoCampo.innerHTML = `
            <label for="alimento">Alimento:</label>
            <select name="alimento" onchange="mostrarOpciones(this)">
                <option value="seleccionar" disabled selected>Seleccionar</option>
                ${crearOpcionesDestinos()}
            </select>
            <div id="opciones"></div>
            <label for="cantidad">Cantidad:</label>
            <input type="text" name="cantidad" placeholder="Ingrese la cantidad de alimentos">
        `;
    alimentosSection.appendChild(nuevoCampo);
  }

  // Función para crear las opciones del desplegable
  function crearOpcionesDestinos() {
    let opciones = "";
    alimentos.forEach((alimento) => {
      opciones += `<option value="${alimento.nombre}">${alimento.nombre}</option>`;
    });
    return opciones;
  }

  // Función para mostrar opciones específicas según el destino seleccionado:

  /*"select" es el valor de la opción seleccionada en el option a través del evento onchange creado en el elemento select (más arriba en el HTML elements creados en la anterior función)*/
  function mostrarOpciones(select) {
    const opcionSeleccionada = select.value;
    const opcionesDiv =
      select.nextElementSibling; /*es decir, más arriba en el HTML elements creados en la anterior función, este hace referecia a este: <div id="opciones"></div>*/

    // Limpiar opciones anteriores
    opcionesDiv.innerHTML = "";

    // Encontrar el destino seleccionado
    /*.find() te devuelve el primer elemento del array que cumpla esta condición que hemos establecido*/
    const alimentoSeleccionado = alimentos.find(
      (alimento) => alimento.nombre === opcionSeleccionada
    );
  }

  // Función para calcular el itinerario
  function calcularNutricion() {
    let cantidadTotal = 0;

    let resultadosHTML = `
            <h2>Resultados:</h2>
            <table>
                <tr>
                    <th>Alimento</th>
                    <th>Cantidad</th>
                    <th>Calorías</th>
                    <th>Proteínas</th>
                    <th>Datos adicionales</th>
                </tr>
        `;

    const alimentosInputs = document.getElementsByName("alimento");
    const cantidadInputs = document.getElementsByName("cantidad");

    for (let i = 0; i < alimentosInputs.length; i++) {
      const tipoAlimento = alimentosInputs[i].value;
      const cantidad = parseInt(cantidadInputs[i].value);

      // Validar duración ingresada
      if (isNaN(cantidad) || cantidad <= 0) {
        alert(
          "Por favor, ingrese una cantidad válida para el alimento " +
            alimentosInputs[i].value
        );
        return;
      }
      let calorias = "";
      let proteinas = "";
      let datosAdicionales = "";

      // Buscar el alimento seleccionado en la lista de alimentos
      const alimentoSeleccionado = alimentos.find(
        (alimento) => alimento.nombre === tipoAlimento
      );

      if (alimentoSeleccionado) {
        // Asignar cantidad según tipo de alimento
        if (
          alimentoSeleccionado instanceof Fruta ||
          alimentoSeleccionado instanceof Verdura ||
          alimentoSeleccionado instanceof Alimento
        ) {
          /*Calcular calorias y proteinas por cada alimento seleccionado*/
          calorias = parseInt(alimentoSeleccionado.calorias) * cantidad;
          proteinas = parseInt(alimentoSeleccionado.proteinas) * cantidad;
          function calcularComparacion() {
            let objetivo = document.getElementById("objetivo");
            /*parseFloat() analiza una cadena y lo devuelve como número, y si no puede convertirlo te devuelve NaN- por eso al introducir letras en el campo "Duración Máxima (días) te devuelve NaN*/
            let valorMaximo = parseFloat(objetivo.value);

            if (valorMaximo > calorias) {
              let caloriasSobrantes = valorMaximo - calorias;
              resultadosComparacion.innerHTML = `<p> ¡Te has pasado de calorías! (Tienes que eliminar ${caloriasSobrantes} kcal de tu dieta) </p>`;
            } else if (valorMaximo == calorias) {
              resultadosComparacion.innerHTML = `<p> ¡Has planificado tu dieta al límite! No te sobran ni te faltan calorías. </p>`;
            } else {
              let caloriasRestantes = calorias - valorMaximo;
              resultadosComparacion.innerHTML = `<p> Aún puedes añadir más Kcal a tu dieta (${caloriasRestantes} Kcal restantes). </p>`;
            }
          }
        }

        // Determinar "Datos adicionales"
        if (alimentoSeleccionado instanceof Fruta) {
          datosAdicionales = alimentoSeleccionado.conservacion;
        } else if (alimentoSeleccionado instanceof Verdura) {
          datosAdicionales = alimentoSeleccionado.frescas;
        } else if (alimentoSeleccionado instanceof Alimento) {
          datosAdicionales = "Amplia tu dieta con este tipo de alimentos";
        }

        // Agregar fila a la tabla de resultados
        resultadosHTML += `
                    <tr>
                        <td>${alimentoSeleccionado.nombre}</td>
                        <td>${cantidad}</td>
                        <td>${calorias}</td>
                        <td>${proteinas}</td>
                        <td>${datosAdicionales}</td>
                    </tr>
                `;

        cantidadTotal += cantidad;
      }
    }

    resultadosHTML += `</table>`;
    resultadosSection.innerHTML = resultadosHTML;

    // Mostrar cantidad total nutrición
    alert("La cantidad de alimento es de " + cantidadTotal);
    cantidadTotalMax = cantidadTotal;
  }

  function calcularComparacion() {
    let objetivo = document.getElementById("objetivo");
    let valorMaximo = parseFloat(objetivo.value);

    if (cantidadTotalMax > valorMaximo) {
      let cantidadesSobrantes = cantidadTotalMax - valorMaximo;
      resultadosComparacion.innerHTML = `<p> ¡Te has pasado de cantidades! (Tienes que eliminar ${cantidadesSobrantes} cantidades de tus alimentos) </p>`;
    } else if (cantidadTotalMax == valorMaximo) {
      resultadosComparacion.innerHTML = `<p> ¡Has planificado tus cantidades de alimentos a las mil maravillas! No te sobran ni te faltan cantidades. </p>`;
    } else {
      let cantidadesRestantes = valorMaximo - cantidadTotalMax;
      resultadosComparacion.innerHTML = `<p> Aún puedes añadir más cantidades de alimentos a tu dieta (${cantidadesRestantes} cantidades restantes). </p>`;
    }
    /*Función para validar dato introducido en el campo "¿Qúe cantidades de alimentos deseas consumir diariamente?" */
    function validateForm() {
      let objetivo = document.getElementById("objetivo").value;
      if (objetivo != Number(objetivo)) {
        let errorMessage = document.getElementById("errorOne");
        errorMessage.style.marginBottom = "10px";
        errorMessage.textContent =
          "El valor de cantidad debe contener sólo números";
        let inputObjetivo = document.getElementById("objetivo");
        inputObjetivo.style.marginBottom = "10px";
      } else if (objetivo < 0) {
        let errorMessage = document.getElementById("errorOne");
        errorMessage.style.marginBottom = "10px";
        errorMessage.textContent = "El valor de cantidad debe ser mayor a 0";
        let inputObjetivo = document.getElementById("objetivo");
        inputObjetivo.style.marginBottom = "10px";
      } else {
        console.log("error");
      }
    }
    validateForm();
  }

  // Evento para agregar campo de alimento al hacer clic en un botón
  document
    .getElementById("agregar-alimento")
    .addEventListener("click", agregarCampoDestino);

  // Evento para calcular el contenido nutricional al hacer clic en un botón
  document
    .getElementById("calcular-nutricion")
    .addEventListener("click", calcularNutricion);

  // Evento para calcular la comparación de cantidades al hacer clic en un botón
  document
    .getElementById("calcular-comparacion")
    .addEventListener("click", calcularComparacion);
});

/*ACCESIBILIDAD */
let btnAumentar = document.getElementById("btn-aumentar");
let btnDisminuir = document.getElementById("btn-disminuir");

let tamaño = 16;
/*Función para aumentar tamaño de letra*/
function aumentar() {
  tamaño += 2;
  document.body.style.fontSize = tamaño + "px";
}
/*Función para disminuir tamaño de letra*/
function disminuir() {
  tamaño -= 2;
  document.body.style.fontSize = tamaño + "px";
}

/*Eventos para ejecutar las funciones de los correspondientes botones*/
btnAumentar.addEventListener("click", aumentar);
btnDisminuir.addEventListener("click", disminuir);
