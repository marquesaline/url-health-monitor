import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatusHistoryChart({ checks }) {
  if (!checks || checks.length === 0) return <p>No status history available.</p>;

  const upCount = checks.filter((check) => check.success).length;
  const downCount = checks.length - upCount;

  const data = {
    labels: ["UP", "DOWN"],
    datasets: [
      {
        label: "Status Count",
        data: [upCount, downCount],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div style={{ width: "600px", height: "300px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
