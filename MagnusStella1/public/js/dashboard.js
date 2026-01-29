//dashboard
//cositas para el moda
let modal = document.getElementById("myModal");

let modalActive = document.getElementById("myModal-active");

// Get the button that opens the modal

let btn = document.getElementById("openModalBtn");

//get the button that opens modal of active filters
let btn_active = document.getElementById("openModalBtn-active");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let lineColor1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--line-color-1"
);
let lineColor2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--line-value-2"
);

const creaGraficaLinea = (grapN, x, y, titulo) => {
  let lineColor1 = getComputedStyle(document.documentElement).getPropertyValue(
    "--line-color-1"
  );
  new Chart(grapN, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          label: titulo,
          data: y,
          borderWidth: 1,
          borderColor: lineColor1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

//grafica promedio de puntaje
const meses = promedioMes.map((dato) => dato.mes);
const promedio = promedioMes.map((dato) => dato.promedio);
const graph1 = document.getElementById("promedioxMes");
const titulo = "Promedio de puntaje";

creaGraficaLinea(graph1, meses, promedio, titulo);

// tasa de respuesta
const ctx = document.getElementById("tasaContestada");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Tasa de Respuesta", "Restante"],
    datasets: [
      {
        data: [tasaDeRespuesta, 100 - tasaDeRespuesta],
        backgroundColor: ["#2e3d50", "#D9D9D9"],
        hoverBackgroundColor: ["#2e3d50", "#D9D9D9"],
      },
    ],
  },
  options: {
    cutoutPercentage: 80,
  },
});

//respuestas enviadas
const enviadaMeses = respuestasEnviadas.map((dato) => dato.mes);
const enviadas = respuestasEnviadas.map((dato) => dato.enviadas);
const graph2 = document.getElementById("respuestaEnviada");
const titulo2 = "Encuestas enviadas";

creaGraficaLinea(graph2, enviadaMeses, enviadas, titulo2, lineColor1);


btn.onclick = function () {
    modal.style.display = "block";
};

btn_active.onclick = function () {
  modalActive.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == modalActive) {
    modal.style.display = "none";
    modalActive.style.display = "none";
  }
};

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
    modalActive.style.display = "none";
  }
});

//funcion de rating estrellas
const stars = document.querySelectorAll(".estrellas i");
stars.forEach((star, index1) => {
  console.log(stars);
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      index1 >= index2
        ? star.classList.add("active")
        : star.classList.remove("active");
    });
  });
});


