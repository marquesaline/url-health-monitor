import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ResponseTimeChart({ checks }) {
  if (!checks || checks.length === 0) return <p>No response data available.</p>;

  const data = {
    labels: checks.map((check) => new Date(check.checked_at).toLocaleTimeString()),
    datasets: [
      {
        label: "Response Time (ms)",
        data: checks.map((check) => check.response_time),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
    ],
  };

  return <Line data={data} />;
}
