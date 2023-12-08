import Chart from "chart.js/auto";

export const accountDiagramChart = (labels, dataValues) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const accountId = urlSearchParams.get("accountId");
  const historyBalanceId = urlSearchParams.get("historyBalanceId");

  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  if (historyBalanceId){
    canvas.style.maxWidth = "95%";
    canvas.style.maxHeight = "400px";
  }
  const chartScriptUrl = document.createElement("script");
  chartScriptUrl.src = "https://cdn.jsdelivr.net/npm/chart.js";
  const chartScript = document.createElement("script").append(
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: accountId ? labels[5] : labels[11],
            data: dataValues,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
            ],
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
