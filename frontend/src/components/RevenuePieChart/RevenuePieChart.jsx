import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./RevenuePieChart.css";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function RevenuePieChart({ revenueByPlan }) {
  const data = Object.entries(revenueByPlan).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="revenue-pie-card">
      <h3>Revenue by Membership Plan</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="dot"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
