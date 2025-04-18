import { useState } from "react";

const Header = ({ onSettingsClick, onClearClick, isDarkMode }) => {
  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <h1>SVGTorn</h1>
        </div>

        <div className="actions">
          <button className="action-btn" onClick={onSettingsClick}>
            <span>⚙️ Settings</span>
          </button>
          <button className="action-btn" onClick={onClearClick}>
            <span>🗑️ Clear</span>
          </button>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/lalit58"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="/github.svg" alt="GitHub" />
          </a>
          <a
            href="https://x.com/lalit_soren"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="/twitter.svg" alt="Twitter" />
          </a>
          <a
            href="https://www.linkedin.com/in/lalitkumarsoren/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>

      <style jsx>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: ${isDarkMode ? "#1a1a1a" : "#ffffff"};
          border-bottom: 1px solid ${isDarkMode ? "#333333" : "#eeeeee"};
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .logo h1 {
          margin: 0;
          font-size: 1.5rem;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          transition: color 0.3s ease;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          background: ${isDarkMode ? "#333333" : "#f0f0f0"};
          border: none;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: ${isDarkMode ? "#444444" : "#e0e0e0"};
          transform: translateY(-2px);
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${isDarkMode ? "#333333" : "#f0f0f0"};
          transition: all 0.2s;
        }

        .social-link:hover {
          background: ${isDarkMode ? "#444444" : "#e0e0e0"};
          transform: translateY(-2px);
        }

        .social-link img {
          width: 20px;
          height: 20px;
          filter: ${isDarkMode ? "invert(1)" : "none"};
          transition: filter 0.3s ease;
        }
      `}</style>
    </header>
  );
};

export default Header;
