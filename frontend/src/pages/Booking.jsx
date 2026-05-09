import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createBooking } from "../services/api";

function Booking() {
  const { fieldId } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    field_id: Number(fieldId),
    booking_date: "",
    start_time: "",
    end_time: "",
    status: "pending",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "field_id"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.booking_date || !formData.start_time || !formData.end_time) {
      setError("Vui lòng nhập đầy đủ ngày và khung giờ đặt sân.");
      return;
    }

    if (formData.end_time <= formData.start_time) {
      setError("Giờ kết thúc phải lớn hơn giờ bắt đầu.");
      return;
    }

    try {
      const result = await createBooking(formData);
      setMessage(`Đặt sân thành công! Mã booking: ${result.bookingId}`);

      setFormData({
        field_id: Number(fieldId),
        booking_date: "",
        start_time: "",
        end_time: "",
        status: "pending",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="booking-layout">
          <div className="booking-side-card">
            <span className="hero-badge">Biểu mẫu đặt sân</span>
            <h1>Hoàn tất đặt sân</h1>
            <p>
              Điền đầy đủ thông tin để xác nhận lịch đặt sân. Sau khi tạo thành công,
              bạn có thể kiểm tra lại trong phần quản lý đặt sân.
            </p>

            <div className="booking-summary">
              <div className="summary-item">
                <span>Mã sân</span>
                <strong>{fieldId}</strong>
              </div>
              <div className="summary-item">
                <span>Người đặt</span>
                <strong>{currentUser?.username || "Đang tải..."}</strong>
              </div>
              <div className="summary-item">
                <span>Trạng thái mặc định</span>
                <strong>pending</strong>
              </div>
              <div className="summary-item">
                <span>Hình thức</span>
                <strong>Đặt theo giờ</strong>
              </div>
            </div>
          </div>

          <div className="simple-card">
            <h2 style={{ marginBottom: "8px" }}>Thông tin đặt sân</h2>
            <p className="section-subtitle" style={{ marginBottom: "20px" }}>
              Vui lòng kiểm tra kỹ ngày và khung giờ trước khi xác nhận.
            </p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div>
                <label>Mã người dùng</label>
                <input
                  type="text"
                  value={currentUser?.username || ""}
                  disabled
                />
              </div>

              <div>
                <label>Mã sân</label>
                <input
                  type="number"
                  name="field_id"
                  value={formData.field_id}
                  disabled
                />
              </div>

              <div>
                <label>Ngày đặt sân</label>
                <input
                  type="date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="time-grid">
                <div>
                  <label>Giờ bắt đầu</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Giờ kết thúc</label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "fit-content" }}>
                Xác nhận đặt sân
              </button>
            </form>

            {message && <p className="success-text">{message}</p>}
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Booking;