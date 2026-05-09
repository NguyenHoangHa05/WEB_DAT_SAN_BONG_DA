import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminMatches } from "../services/api";
import { formatDateTimeVN } from "../utils/format";

function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getAdminMatches();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
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
              <h1 className="section-title">Quản lý trận đấu</h1>
              <p className="section-subtitle">
                Theo dõi danh sách các trận đấu hiện có trong hệ thống.
              </p>
            </div>
          </div>

          {loading && <p>Đang tải dữ liệu trận đấu...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && matches.length === 0 && (
            <div className="empty-box">Hiện chưa có trận đấu nào trong hệ thống.</div>
          )}

          {!loading && !error && matches.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên trận</th>
                    <th>Địa điểm</th>
                    <th>Thời gian</th>
                    <th>Sức chứa</th>
                    <th>Booking ID</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match.id}>
                      <td>{match.id}</td>
                      <td>{match.title}</td>
                      <td>{match.location || "-"}</td>
                      <td>{formatDateTimeVN(match.time) || match.time}</td>
                      <td>{match.max_players || "-"}</td>
                      <td>{match.booking_id || "-"}</td>
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

export default AdminMatches;