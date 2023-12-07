import Chart from "chart.js/auto";

export const historyBalanceDiagram = (labels, dataValuesPlus,dataValuesMinus) => {
  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  canvas.style.maxWidth = "95%";
  canvas.style.maxHeight = "300px";

  const chartScriptUrl = document.createElement("script");
  chartScriptUrl.src = "https://cdn.jsdelivr.net/npm/chart.js";
  const chartScript = document.createElement("script").append(
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Расходы",
            data: dataValuesMinus, // Отрицательные значения (расходы)
            backgroundColor: "rgba(255, 99, 132, 0.5)", // Красный цвет
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Доходы",
            data: dataValuesPlus, // Положительные значения (доходы)
            backgroundColor: "rgba(75, 255, 100, 0.5)", // Зеленый цвет
            borderColor: "rgba(75, 150, 100, 1)",
            borderWidth: 1,
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
    })
  );

  document.body.append(chartScriptUrl);

  const accountDynamicsDiv = document.createElement("div");
  accountDynamicsDiv.className = "account-dynamics";

  accountDynamicsDiv.append(canvas);

  return accountDynamicsDiv;
};
