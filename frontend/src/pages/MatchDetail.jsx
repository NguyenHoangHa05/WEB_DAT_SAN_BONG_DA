import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMatches, getMatchPlayers, joinMatch } from "../services/api";
import { formatDateTimeVN } from "../utils/format";

function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
      return;
    }

    const fetchData = async () => {
      try {
        const allMatches = await getMatches();
        const foundMatch = allMatches.find((m) => String(m.id) === String(id));
        setMatch(foundMatch || null);

        const playerData = await getMatchPlayers(id);
        setPlayers(playerData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleJoin = async () => {
    setMessage("");
    setError("");

    if (!currentUser?.player_id) {
      setError("Tài khoản của bạn chưa được liên kết với hồ sơ cầu thủ.");
      return;
    }

    const isJoined = players.some(
      (player) => Number(player.id) === Number(currentUser.player_id)
    );

    if (isJoined) {
      setError("Bạn đã tham gia trận này rồi.");
      return;
    }

    if (match && players.length >= Number(match.max_players)) {
      setError("Trận đấu đã đủ số lượng người tham gia.");
      return;
    }

    try {
      const result = await joinMatch({
        match_id: Number(id),
      });

      setMessage(result.message || "Tham gia trận thành công");

      const playerData = await getMatchPlayers(id);
      setPlayers(playerData);
    } catch (err) {
      setError(err.message);
    }
  };

  const getPlayerName = (player) => {
    return (
      player.player_name ||
      player.name ||
      player.full_name ||
      player.username ||
      `Player ${player.id}`
    );
  };

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        {error && <p className="error-text">{error}</p>}

        {match && (
          <>
            <div className="detail-hero">
              <div className="detail-hero-left">
                <span className="hero-badge">Chi tiết trận đấu</span>
                <h1>{match.title}</h1>
                <p>
                  Xem thông tin trận, kiểm tra số lượng người tham gia và đăng ký
                  ngay nếu còn chỗ trống.
                </p>

                <div className="detail-tags">
                  <span className="match-badge">Đang mở đăng ký</span>
                  <span className="detail-tag">
                    Còn {Number(match.max_players) - players.length} chỗ
                  </span>
                </div>
              </div>

              <div className="detail-hero-right">
                <div className="detail-info-box">
                  <h3>Thông tin nhanh</h3>
                  <p><strong>Địa điểm:</strong> {match.location}</p>
                  <p><strong>Thời gian:</strong> {formatDateTimeVN(match.time) || match.time}</p>
                  <p><strong>Số người tối đa:</strong> {match.max_players}</p>
                  <p><strong>Đã tham gia:</strong> {players.length}</p>
                </div>
              </div>
            </div>

            <div className="detail-layout">
              <div className="simple-card">
                <h2 style={{ marginBottom: "16px" }}>Thông tin trận</h2>

                <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
                  <p className="match-info">
                    <strong>Địa điểm:</strong> {match.location}
                  </p>
                  <p className="match-info">
                    <strong>Thời gian:</strong> {formatDateTimeVN(match.time) || match.time}
                  </p>
                  <p className="match-info">
                    <strong>Số người tối đa:</strong> {match.max_players}
                  </p>
                  <p className="match-info">
                    <strong>Số người đã tham gia:</strong> {players.length}
                  </p>
                  <p className="match-info">
                    <strong>Số chỗ còn lại:</strong>{" "}
                    {Number(match.max_players) - players.length}
                  </p>
                </div>

                <div className="notice-box">
                  Lưu ý: Nếu đã đăng ký nhưng không đến, bạn sẽ bị trừ 10.000 VNĐ.
                </div>

                <div style={{ marginTop: "22px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}>
                    Tài khoản tham gia
                  </label>
                  <input
                    type="text"
                    value={currentUser?.username || ""}
                    className="single-input"
                    disabled
                  />
                </div>

                <button className="btn-primary" style={{ marginTop: "18px" }} onClick={handleJoin}>
                  Tham gia trận
                </button>

                {message && <p className="success-text">{message}</p>}
                {error && <p className="error-text">{error}</p>}
              </div>

              <div className="simple-card">
                <h2 style={{ marginBottom: "16px" }}>Danh sách người tham gia</h2>

                <div className="table-wrap" style={{ boxShadow: "none", padding: 0 }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Mã cầu thủ</th>
                        <th>Tên cầu thủ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player) => (
                        <tr key={player.id}>
                          <td>{player.id}</td>
                          <td>{getPlayerName(player)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MatchDetail;