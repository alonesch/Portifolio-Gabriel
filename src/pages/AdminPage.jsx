import React from "react";
import Admin from "../components/Admin/Admin";

const AdminPage = ({ tipo, onLogout }) => {
  return (
    <div className="admin-page">
      <Admin tipo={tipo} onLogout={onLogout} />
    </div>
  );
};

export default AdminPage;
