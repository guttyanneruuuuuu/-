import { useState, useEffect } from "react";

const UNIVERSITIES = [
  { name: "東京大学 理科一類", cutoff: 310, max: 440, subjects: ["英語", "数学", "国語", "物理", "化学"] },
  { name: "東京大学 文科一類", cutoff: 340, max: 440, subjects: ["英語", "数学", "国語", "世界史", "地理"] },
  { name: "京都大学 工学部", cutoff: 290, max: 420, subjects: ["英語", "数学", "国語", "物理", "化学"] },
  { name: "京都大学 法学部", cutoff: 305, max: 420, subjects: ["英語", "数学", "国語", "世界史", "地理"] },
  { name: "大阪大学 理学部", cutoff: 265, max: 400, subjects: ["英語", "数学", "国語", "物理", "化学"] },
  { name: "東北大学 工学部", cutoff: 245, max: 380, subjects: ["英語", "数学", "国語", "物理", "化学"] },
  { name: "早稲田大学 理工学部", cutoff: 210, max: 300, subjects: ["英語", "数学", "物理", "化学"] },
  { name: "慶應義塾大学 理工学部", cutoff: 200, max: 300, subjects: ["英語", "数学", "物理", "化学"] },
  { name: "東京工業大学", cutoff: 270, max: 400, subjects: ["英語", "数学", "物理", "化学"] },
  { name: "一橋大学 経済学部", cutoff: 265, max: 400, subjects: ["英語", "数学", "国語", "世界史"] },
];

const SUBJECT_MAX = { "英語": 80, "数学": 80, "国語": 80, "物理": 60, "化学": 60, "生物": 60, "世界史": 60, "日本史": 60, "地理": 60 };

export default function App() {
  const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0]);
  const [scores, setScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [animateBar, setAnimateBar] = useState(false);

  useEffect(() => {
    const init = {};
    selectedUni.subjects.forEach(s => init[s] = "");
    setScores(init);
    setShowResult(false);
    setAnimateBar(false);
  }, [selectedUni]);

  const total = selectedUni.subjects.reduce((sum, s) => sum + (parseInt(scores[s]) || 0), 0);
  const maxTotal = selectedUni.subjects.reduce((sum, s) => sum + (SUBJECT_MAX[s] || 100), 0);
  const percent = Math.min(100, Math.round((total / selectedUni.max) * 100));
  const cutoffPercent = Math.round((selectedUni.cutoff / selectedUni.max) * 100);
  const passing = total >= selectedUni.cutoff;
  const gap = selectedUni.cutoff - total;

  const handleCalc = () => {
    setShowResult(true);
    setTimeout(() => setAnimateBar(true), 100);
  };

  const handleScore = (subject, val) => {
    const max = SUBJECT_MAX[subject] || 100;
    const n = Math.min(max, Math.max(0, parseInt(val) || 0));
    setScores(prev => ({ ...prev, [subject]: val === "" ? "" : n }));
    setShowResult(false);
    setAnimateBar(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Noto Serif JP', Georgia, serif",
      color: "#e8e4d9",
      padding: "0",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .grid-bg {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-image: linear-gradient(rgba(255,200,80,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,200,80,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        
        .glow {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,180,50,0.06) 0%, transparent 70%);
          top: -200px; right: -200px; pointer-events: none;
        }
        
        select {
          background: #13131a;
          color: #e8e4d9;
          border: 1px solid rgba(255,200,80,0.2);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 15px;
          font-family: 'Noto Serif JP', serif;
          width: 100%;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffc850' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        
        select:focus { border-color: rgba(255,200,80,0.5); }
        
        input[type=number] {
          background: #13131a;
          color: #e8e4d9;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 18px;
          font-family: 'Playfair Display', serif;
          width: 100%;
          outline: none;
          text-align: center;
          transition: border-color 0.2s;
          -moz-appearance: textfield;
        }
        
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        
        input[type=number]:focus { border-color: rgba(255,200,80,0.5); }
        
        .calc-btn {
          background: linear-gradient(135deg, #c8960c, #f5c842);
          color: #0a0a0f;
          border: none;
          border-radius: 10px;
          padding: 16px 40px;
          font-size: 16px;
          font-family: 'Noto Serif JP', serif;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          letter-spacing: 2px;
          transition: opacity 0.2s, transform 0.1s;
        }
        
        .calc-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .calc-btn:active { transform: translateY(0); }
        
        .bar-track {
          height: 12px;
          background: rgba(255,255,255,0.06);
          border-radius: 6px;
          overflow: visible;
          position: relative;
          margin: 8px 0;
        }
        
        .bar-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        
        .cutoff-line {
          position: absolute;
          top: -8px;
          width: 2px;
          height: 28px;
          background: rgba(255,255,255,0.4);
          border-radius: 1px;
        }
        
        .cutoff-label {
          position: absolute;
          top: -28px;
          transform: translateX(-50%);
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          letter-spacing: 0.5px;
        }
        
        .result-card {
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          animation: fadeUp 0.5s ease;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .subject-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .subject-row:last-child { border-bottom: none; }
      `}</style>

      <div className="grid-bg" />
      <div className="glow" />

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 20px 80px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "rgba(255,200,80,0.6)", marginBottom: 16, textTransform: "uppercase" }}>
            University Entrance Exam
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
            合格点
            <span style={{ fontStyle: "italic", color: "#f5c842" }}> シミュレーター</span>
          </h1>
          <p style={{ fontSize: 13, color: "rgba(232,228,217,0.4)", letterSpacing: 1 }}>
            得点を入力して合格可能性を判定
          </p>
        </div>

        {/* University Select */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,200,80,0.5)", marginBottom: 10, textTransform: "uppercase" }}>
            志望校を選択
          </div>
          <div style={{ position: "relative" }}>
            <select value={selectedUni.name} onChange={e => setSelectedUni(UNIVERSITIES.find(u => u.name === e.target.value))}>
              {UNIVERSITIES.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              合格最低点 <span style={{ color: "#f5c842", fontFamily: "'Playfair Display', serif", fontSize: 16 }}>{selectedUni.cutoff}</span>点
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              満点 <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Playfair Display', serif", fontSize: 16 }}>{selectedUni.max}</span>点
            </div>
          </div>
        </div>

        {/* Score Inputs */}
        <div style={{
          background: "#13131a",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "24px",
          marginBottom: 24
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,200,80,0.5)", marginBottom: 16, textTransform: "uppercase" }}>
            各科目の得点
          </div>

          {selectedUni.subjects.map(subject => (
            <div key={subject} className="subject-row">
              <div style={{ flex: 1, fontSize: 14, color: "rgba(232,228,217,0.7)" }}>{subject}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", minWidth: 40, textAlign: "right" }}>
                /{SUBJECT_MAX[subject]}
              </div>
              <div style={{ width: 90 }}>
                <input
                  type="number"
                  min={0}
                  max={SUBJECT_MAX[subject]}
                  value={scores[subject] ?? ""}
                  onChange={e => handleScore(subject, e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,200,80,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>合計</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#f5c842" }}>
              {total}
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>/ {selectedUni.max}</span>
            </div>
          </div>
        </div>

        {/* Calc Button */}
        <button className="calc-btn" onClick={handleCalc}>
          判定する
        </button>

        {/* Result */}
        {showResult && (
          <div style={{ marginTop: 28 }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>
                <span>0</span>
                <span>{selectedUni.max}</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: animateBar ? `${percent}%` : "0%",
                    background: passing
                      ? "linear-gradient(90deg, #c8960c, #f5c842)"
                      : "linear-gradient(90deg, #8b1a1a, #e53e3e)",
                  }}
                />
                <div className="cutoff-line" style={{ left: `${cutoffPercent}%` }}>
                  <div className="cutoff-label">合格最低点 {selectedUni.cutoff}</div>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div
              className="result-card"
              style={{
                background: passing
                  ? "linear-gradient(135deg, rgba(200,150,12,0.08), rgba(245,200,66,0.05))"
                  : "linear-gradient(135deg, rgba(139,26,26,0.15), rgba(229,62,62,0.05))",
                border: `1px solid ${passing ? "rgba(245,200,66,0.2)" : "rgba(229,62,62,0.2)"}`,
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: 3, color: passing ? "rgba(245,200,66,0.6)" : "rgba(229,62,62,0.6)", marginBottom: 12, textTransform: "uppercase" }}>
                判定結果
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 52,
                fontWeight: 700,
                color: passing ? "#f5c842" : "#fc8181",
                marginBottom: 8,
                lineHeight: 1
              }}>
                {passing ? "A" : "D"}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: passing ? "#f5c842" : "#fc8181" }}>
                {passing ? "合格圏内" : "合格まであと一歩"}
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                {passing ? (
                  <>
                    合格最低点まで <span style={{ color: "#f5c842", fontSize: 18 }}>+{Math.abs(gap)}</span> 点の余裕があります
                  </>
                ) : (
                  <>
                    合格最低点まで <span style={{ color: "#fc8181", fontSize: 18 }}>{Math.abs(gap)}</span> 点不足しています
                  </>
                )}
              </div>

              {!passing && (
                <div style={{
                  marginTop: 20,
                  padding: "14px",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.8
                }}>
                  各科目で平均 <span style={{ color: "#f5c842" }}>{Math.ceil(gap / selectedUni.subjects.length)}</span> 点ずつ伸ばすと合格圏内に入ります
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 48, fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: 1 }}>
          ※ 合格最低点は過去のデータに基づく目安です
        </div>
      </div>
    </div>
  );
}
