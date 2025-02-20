import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonitorById } from "../services/api";
import Layout from "../components/Layout";
import ResponseTimeChart from "../components/ResponseTimeChart"; 
import StatusHistoryChart from "../components/StatusHistoryChart"; 

export default function MonitorDetails() {
  const { id } = useParams(); 
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonitor = async () => {
      try {
        const data = await getMonitorById(id);
        setMonitor(data);
      } catch (err) {
        setError("Failed to load monitor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonitor();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold">{monitor.name}</h1>
      <p className="text-gray-600">🔗 {monitor.url}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Response Time</h2>
        <ResponseTimeChart checks={monitor.checks} />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Status History</h2>
        <StatusHistoryChart checks={monitor.checks} />
      </div>
    </Layout>
  );
}
