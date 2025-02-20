import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMonitorById, deleteMonitor } from "../services/api";
import Layout from "../components/Layout";
import ResponseTimeChart from "../components/ResponseTimeChart"; 
import StatusHistoryChart from "../components/StatusHistoryChart"; 
import Modal from "../components/Modal";
import MonitorForm from "../components/MonitorForm";

export default function MonitorDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Para redirecionar após excluir
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${monitor.name}?`)) {
      return;
    }

    try {
      await deleteMonitor(monitor.id);
      navigate("/");
    } catch (err) {
      setError("Failed to delete monitor.");
    }
  };

  const handleMonitorUpdated = (updatedMonitor) => {
    setMonitor(updatedMonitor);
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{monitor.name}</h1>
          <p className="text-gray-600">🔗 {monitor.url}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <MonitorForm 
          monitor={monitor} 
          onMonitorUpdated={handleMonitorUpdated} 
          onClose={() => setIsEditing(false)}
        />
      </Modal>
      <div className="flex justify-between items-center mt-9">
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Response Time</h2>
          <ResponseTimeChart checks={monitor.checks} />
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Status History</h2>
          <StatusHistoryChart checks={monitor.checks} />
        </div>
      </div>
    </Layout>
  );
}
