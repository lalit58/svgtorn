const Modal = ({ isOpen, onClose, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>SVG Settings</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: ${isDarkMode ? "#2a2a2a" : "#ffffff"};
          border-radius: 8px;
          width: 80%;
          max-width: 800px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid ${isDarkMode ? "#444444" : "#eeeeee"};
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .modal-header h2 {
          margin: 0;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: ${isDarkMode ? "#ffffff" : "#666666"};
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: ${isDarkMode ? "#ffffff" : "#000000"};
        }

        .modal-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }

        /* Custom scrollbar for modal body */
        .modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1a1a1a" : "#f0f0f0"};
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? "#444444" : "#cccccc"};
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? "#555555" : "#bbbbbb"};
        }
      `}</style>
    </div>
  );
};

export default Modal;
