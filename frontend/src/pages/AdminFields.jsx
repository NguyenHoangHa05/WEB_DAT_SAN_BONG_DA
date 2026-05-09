import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminFields } from "../services/api";

function AdminFields() {
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getAdminFields();
        setFields(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
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
              <h1 className="section-title">Quản lý sân bóng</h1>
              <p className="section-subtitle">
                Theo dõi danh sách sân bóng hiện có trong hệ thống.
              </p>
            </div>
          </div>

          {loading && <p>Đang tải dữ liệu sân bóng...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && fields.length === 0 && (
            <div className="empty-box">Hiện chưa có sân bóng nào trong hệ thống.</div>
          )}

          {!loading && !error && fields.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sân</th>
                    <th>Giá / giờ</th>
                    <th>Trạng thái</th>
                    <th>Khu vực</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field) => (
                    <tr key={field.id}>
                      <td>{field.id}</td>
                      <td>{field.name}</td>
                      <td>{Number(field.price || 0).toLocaleString("vi-VN")} VNĐ</td>
                      <td>{field.status || "-"}</td>
                      <td>{field.location || "-"}</td>
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

export default AdminFields;