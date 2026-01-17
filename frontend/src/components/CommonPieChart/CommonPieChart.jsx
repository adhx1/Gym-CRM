import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./CommonPieChart.css";

export default function CommonPieChart({ title, data, colors }) {
  return (
    <div className="pie-card">
      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={240}>
  <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={65}
            outerRadius={80}
            label={false}
            labelLine={false}
            cx="50%"
            cy="50%"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ LEGEND */}
      <div className="pie-legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="dot"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

