import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../../components/StatCard/StatCard";
import "./Dashboard.css";
import CommonPieChart from "../../components/CommonPieChart/CommonPieChart";




export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("analytics/stats/");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
      if (error.response?.status === 401) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/auth";
    
      setLoading(false);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("access");

  if (token) {
    fetchStats();
  }
}, []);


if (loading || !stats) {
  return <p style={{ padding: 20 }}>Loading dashboard...</p>;
}

 
const revenueByPlanData = stats
  ? Object.entries(stats.revenue_by_plan).map(
      ([name, value]) => ({
        name,
        value,
      })
    )
  : [];

  return (
    <div className="dashboard-page">
        <div className="dashboard-container">

      
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome to D fit </h2>
        <p>Hello! , Siyad</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Members"
          value={stats.total_members}
          percentage={100}
        />

        <StatCard
          title="Active Members"
          value={stats.active_members}
          percentage={
            stats.total_members
              ? Math.round(
                  (stats.active_members / stats.total_members) * 100
                )
              : 0
          }
        />

        <StatCard
          title="Expired Members"
          value={stats.expired_members}
          percentage={
            stats.total_members
              ? Math.round(
                  (stats.expired_members / stats.total_members) * 100
                )
              : 0
          }
        />

        <StatCard
          title="Expiring / Due"
          value={stats.expiring_soon}
          percentage={
            stats.total_members
              ? Math.round(
                  (stats.expiring_soon / stats.total_members) * 100
                )
              : 0
          }
        />


        
<div className="dashboard-lower">
        {/* Pie Charts */}

{stats && (
  <CommonPieChart
  className="pie-card"
    title="Members Status"
    data={[
      { name: "Active", value: stats.active_members },
      { name: "Expired", value: stats.expired_members },
    ]}
    colors={["#22c55e", "#ef4444"]}
  />
)}

{stats && (
  <CommonPieChart
    className="pie-card"

    title="Revenue by Plan"
    data={revenueByPlanData}
    colors={["#6366f1", "#22c55e", "#f59e0b", "#ef4444"]}
  />
)}

{stats && (
  <CommonPieChart
    className="pie-card"

    title="Total Revenue"
    data={[
      { name: "Total Revenue", value: stats.total_revenue }
    ]}
    colors={["#22c55e"]}
  />
)}



  
</div>




      </div>
            </div>

    </div>
  );
}
}
