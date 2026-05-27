import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Members.css";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    membership_type: "1",
    amount: "",
    join_date: "",
  });

  const handlePaid = async (id) => {
  const confirmPaid = window.confirm(
    "Confirm membership renewal?"
  );

  if (!confirmPaid) return;

  try {
    await api.post(`members/${id}/mark-paid/`);
    fetchMembers();
  } catch (err) {
    console.error(err);
  }
};
};
  // Fetch members
  const fetchMembers = async () => {
    const res = await api.get("members/");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Add / Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingMember) {
      await api.put(`members/${editingMember.id}/`, formData , );
    } else {
      await api.post("members/", formData);
    }

setFormData({
  name: "",
  phone: "",
  membership_type: "1",
  amount: "",
  join_date: "",
});
    setEditingMember(null);
    setShowForm(false);
    fetchMembers();
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      await api.delete(`members/${id}/`);
      fetchMembers();
    }
  };

  // Edit
  const handleEdit = (member) => {
    setEditingMember(member);
  setFormData({
  name: member.name,
  phone: member.phone,
  membership_type: member.membership_type,
  amount: member.amount || "",
  join_date: member.join_date || "",
});

    setShowForm(true);
  };

  return (
    <div className="members-page">
      {/* Header */}
      <div className="members-header">
        <h2>Members</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          + Add Member
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form className="member-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Member Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <select
            value={formData.membership_type}
            onChange={(e) =>
              setFormData({ ...formData, membership_type: e.target.value })
            }
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
 
           <input
  type="number"
  placeholder="Amount (optional)"
  value={formData.amount}
  onChange={(e) =>
    setFormData({
      ...formData,
      amount: e.target.value || null,
    })
  }
/>       
<input
  type="date"
  value={formData.join_date}
  onChange={(e) =>
    setFormData({
      ...formData,
      join_date: e.target.value,
    })
  }
/>


          <button type="submit">
            {editingMember ? "Update Member" : "Add Member"}
          </button>
        </form>
      )}

      {/* Members Table */}
      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Renewal Date</th>
              <th>Due Date</th>
              
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={member.id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.membership_type}</td>
                
                <td>
                  <span
                    className={
                      member.is_active ? "status active" : "status expired"
                    }
                  >
                    {member.is_active ? "Active" : "Expired"}
                  </span>
                </td>
                <td className="actions">
                  <button onClick={() => handleEdit(member)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => handlePaid(member.id)}>
                     Paid
                    </button>
                  
                </td>
         <td>{member.start_date || member.join_date}</td> 
         <td>{member.expiry_date}</td>  
                    
         </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
