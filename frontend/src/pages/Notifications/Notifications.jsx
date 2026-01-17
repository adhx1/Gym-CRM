import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Notifications.css";

export default function Notifications() {
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch expired members
  const fetchExpiredMembers = async () => {
    try {
      const res = await api.get("members/"); // filter frontend for now
      const expired = res.data.filter((m) => !m.is_active);
      setExpiredMembers(expired);
    } catch (error) {
      console.error("Failed to fetch expired members", error);
    }
  };

  useEffect(() => {
    fetchExpiredMembers();
  }, []);

  // Send reminder (manual trigger)
  const sendReminder = async () => {
  setLoading(true);
  try {
    const res = await api.post("notifications/send-reminders/");
    alert(`Reminders sent to ${res.data.members_notified} members`);
  } catch (error) {
    alert("Failed to send reminders");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="notifications-page">
      {/* Header */}
      <div className="notifications-header">
        <h2>Expired Members</h2>
        <button
          className="reminder-btn"
          onClick={sendReminder}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reminders"}
        </button>
      </div>

      {/* Table */}
      <div className="notifications-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {expiredMembers.map((member, index) => (
              <tr key={member.id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>
                  <span className="status expired">Expired</span>
                </td>
              </tr>
            ))}

            {expiredMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No expired members 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
