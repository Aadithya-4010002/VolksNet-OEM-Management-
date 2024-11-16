const mixedChartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      type: "bar",
      label: "Targets",
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      data: [150, 200, 180, 220, 240, 260, 230, 210, 250], // Adjusted Sales values
    },
    {
      type: "bar",
      label: "Expenses",
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      data: [100, 120, 110, 150, 130, 160, 140, 130, 150], // Adjusted Expenses values
    },
    {
      type: "line",
      label: "Saving",
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderWidth: 2,
      fill: false,
      data: [50, 80, 70, 70, 110, 100, 90, 80, 100], // Adjusted Profit values
    },
  ],
};

export default mixedChartData;
