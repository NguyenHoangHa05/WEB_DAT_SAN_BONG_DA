import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminBookings } from "../services/api";
import { formatDateVN, formatTimeVN } from "../utils/format";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAdminBookings();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(
      (booking) => String(booking.status).toLowerCase() === "pending"
    ).length;
    const confirmed = bookings.filter(
      (booking) => String(booking.status).toLowerCase() === "confirmed"
    ).length;
    const cancelled = bookings.filter(
      (booking) => String(booking.status).toLowerCase() === "cancelled"
    ).length;

    return { total, pending, confirmed, cancelled };
  }, [bookings]);

  return (
    <div>
      <Navbar />

      <div className="container page-section admin-page-layout">
        <AdminSidebar />

        <div className="admin-page-main">
          <div className="match-page-head">
            <div>
              <span className="hero-badge">Khu vực quản trị</span>
              <h1 className="section-title">Quản lý đặt sân</h1>
              <p className="section-subtitle">
                Theo dõi toàn bộ lượt đặt sân trong hệ thống dưới quyền quản trị viên.
              </p>
            </div>
          </div>

          <div className="profile-info-grid" style={{ marginBottom: "24px" }}>
            <div className="profile-info-item">
              <span>Tổng booking</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="profile-info-item">
              <span>Đang chờ</span>
              <strong>{stats.pending}</strong>
            </div>
            <div className="profile-info-item">
              <span>Đã xác nhận</span>
              <strong>{stats.confirmed}</strong>
            </div>
            <div className="profile-info-item">
              <span>Đã hủy</span>
              <strong>{stats.cancelled}</strong>
            </div>
          </div>

          {loading && <p>Đang tải dữ liệu booking...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && bookings.length === 0 && (
            <div className="empty-box">Hiện chưa có booking nào trong hệ thống.</div>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Mã người dùng</th>
                    <th>Mã sân</th>
                    <th>Tên sân</th>
                    <th>Ngày đặt</th>
                    <th>Giờ bắt đầu</th>
                    <th>Giờ kết thúc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.user_id ?? "-"}</td>
                      <td>{booking.field_id}</td>
                      <td>{booking.field_name || "-"}</td>
                      <td>{formatDateVN(booking.booking_date) || "-"}</td>
                      <td>{formatTimeVN(booking.start_time)}</td>
                      <td>{formatTimeVN(booking.end_time)}</td>
                      <td>{booking.status}</td>
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

export default AdminBookings;