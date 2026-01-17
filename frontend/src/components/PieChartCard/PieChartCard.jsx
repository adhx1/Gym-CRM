import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./PieChartCard.css";

const COLORS = ["#22c55e", "#ef4444"];

export default function PieChartCard({ active, expired }) {
  const data = [
    { name: "Active", value: active },
    { name: "Expired", value: expired },
  ];

  return (
    <div className="pie-card">
      <h3>Members Status</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="legend">
        <span className="active">Active</span>
        <span className="expired">Expired</span>
      </div>
    </div>
  );
}
