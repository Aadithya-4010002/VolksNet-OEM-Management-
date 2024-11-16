const radarChartData = {
    labels: ["Sales", "Marketing", "Development", "Customer Support", "Information Technology", "Administration"],
    datasets: [
      {
        label: "Department Budget ($)",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "#3498db",
        pointBackgroundColor: "#3498db",
        data: [25000, 20000, 30000, 15000, 18000, 12000],
      },
      {
        label: "Department Expenses ($)",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        borderColor: "#e74c3c",
        pointBackgroundColor: "#e74c3c",
        data: [22000, 17000, 28000, 13000, 15000, 10000],
      },
    ],
  };
  
  export default radarChartData;