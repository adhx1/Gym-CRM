import "./StatCard.css";

export default function StatCard({ title, value, percentage, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>

      <div className="stat-value">{value}</div>

      {percentage !== undefined && (
        <div className="stat-footer">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="percentage">{percentage}%</span>
        </div>
      )}
    </div>
  );
}
