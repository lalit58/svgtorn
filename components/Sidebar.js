import React from "react";

const Sidebar = ({
  onCopySvg,
  onDownloadSvg,
  onResetSettings,
  onThemeToggle,
  isDarkMode,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="options">
          <h3>Quick Actions</h3>
          <button className="option-btn" onClick={onCopySvg}>
            <span>📋 Copy SVG</span>
          </button>
          <button className="option-btn" onClick={onDownloadSvg}>
            <span>📥 Download SVG</span>
          </button>
          <button className="option-btn" onClick={onResetSettings}>
            <span>🔄 Reset Settings</span>
          </button>
          <button className="option-btn theme-toggle" onClick={onThemeToggle}>
            <span>{isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}</span>
          </button>
        </div>

        <div className="credits">
          <p>Created By Lalit</p>
          <p className="version">Version 1.0.0</p>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 60px;
          bottom: 0;
          width: 200px;
          background: ${isDarkMode ? "#2a2a2a" : "#f5f5f5"};
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          padding: 20px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .options {
          flex: 1;
        }

        h3 {
          margin: 0 0 20px 0;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          font-size: 1.1rem;
        }

        .option-btn {
          width: 100%;
          background: ${isDarkMode ? "#333333" : "#f0f0f0"};
          border: none;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
        }

        .option-btn:hover {
          background: ${isDarkMode ? "#444444" : "#e0e0e0"};
          transform: translateX(5px);
        }

        .theme-toggle {
          margin-top: 20px;
          background: ${isDarkMode ? "#444444" : "#e0e0e0"};
        }

        .credits {
          margin-top: auto;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid ${isDarkMode ? "#444444" : "#eeeeee"};
        }

        .credits p {
          margin: 5px 0;
          color: ${isDarkMode ? "#aaaaaa" : "#666666"};
        }

        .version {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
