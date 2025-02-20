import { useState } from "react";
import { createMonitor } from "../services/api";

export default function MonitorForm({ onMonitorAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    check_interval: 5, 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newMonitor = await createMonitor(formData);
      onMonitorAdded(newMonitor); 
      setFormData({ name: "", url: "", check_interval: 5 });
    } catch (err) {
      setError("Failed to add monitor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Monitor</h2>

      {error && <p className="text-red-500">{error}</p>}

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-2">
        URL:
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-4">
        Check Interval (min):
        <input
          type="number"
          name="check_interval"
          value={formData.check_interval}
          onChange={handleChange}
          min="5"
          required
          className="border p-2 w-full"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Monitor"}
      </button>
    </form>
  );
}
