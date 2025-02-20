import { Link } from "react-router-dom";

export default function MonitorCard({ monitor }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">{monitor.name}</h2>
      <p className="text-sm text-gray-500">{monitor.url}</p>

      <div className="mt-3 flex items-center">
        <span className={`inline-block w-3 h-3 rounded-full ${monitor.status === "up" ? "bg-green-500" : "bg-red-500"}`}></span>
        <span className="ml-2 text-gray-600">{monitor.status === "up" ? "Online" : "Offline"}</span>
      </div>

      <p className="text-xs text-gray-400 mt-2">Last check: {new Date(monitor.last_checked_at).toLocaleString()}</p>

      <Link to={`/monitor/${monitor.id}`} className="text-blue-500 underline mt-2 block">
        View Details
      </Link>
    </div>
  );
}
