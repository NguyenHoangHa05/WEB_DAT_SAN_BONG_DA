import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminUsers } from "../services/api";
import { formatDateTimeVN } from "../utils/format";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container page-section admin-page-layout">
        <AdminSidebar />

        <div className="admin-page-main">
          <div className="match-page-head">
            <div>
              <span className="hero-badge">Khu vực quản trị</span>
              <h1 className="section-title">Quản lý người dùng</h1>
              <p className="section-subtitle">
                Theo dõi danh sách tài khoản đã đăng ký trong hệ thống.
              </p>
            </div>
          </div>

          {loading && <p>Đang tải dữ liệu người dùng...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && users.length === 0 && (
            <div className="empty-box">Hiện chưa có người dùng nào trong hệ thống.</div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Vai trò</th>
                    <th>Player ID</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email || "-"}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.role}</td>
                      <td>{user.player_id || "-"}</td>
                      <td>{formatDateTimeVN(user.created_at) || user.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;