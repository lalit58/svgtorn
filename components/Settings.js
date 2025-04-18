import { useState } from "react";

const Settings = ({ onSettingsChange, isDarkMode }) => {
  const [settings, setSettings] = useState({
    // Basic Settings
    optimizeSvg: true,
    removeTitle: true,
    removeDesc: true,
    removeUselessDefs: true,
    removeEditorsNsData: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeViewBox: false,
    cleanupEnableBackground: true,

    // Color Settings
    convertColors: true,

    // Path Settings
    convertPathData: true,
    convertTransform: true,

    // Cleanup Settings
    removeUnknownsAndDefaults: true,
    removeNonInheritableGroupAttrs: true,
    removeUselessStrokeAndFill: true,
    removeUnusedNs: true,
    cleanupIds: true,
    cleanupNumericValues: true,

    // Group Settings
    moveElemsAttrsToGroup: true,
    moveGroupAttrsToElems: true,
    collapseGroups: true,

    // Advanced Settings
    removeRasterImages: true,
    mergePaths: true,
    convertShapeToPath: true,
    sortAttrs: true,
  });

  const handleChange = (key) => (e) => {
    const newSettings = {
      ...settings,
      [key]: e.target.checked,
    };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="settings-panel">
      <div className="settings-group">
        <h4>Basic Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.optimizeSvg}
            onChange={handleChange("optimizeSvg")}
          />
          Optimize SVG
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeTitle}
            onChange={handleChange("removeTitle")}
          />
          Remove Title
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeDesc}
            onChange={handleChange("removeDesc")}
          />
          Remove Description
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeUselessDefs}
            onChange={handleChange("removeUselessDefs")}
          />
          Remove Useless Defs
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeEditorsNsData}
            onChange={handleChange("removeEditorsNsData")}
          />
          Remove Editors NS Data
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeEmptyAttrs}
            onChange={handleChange("removeEmptyAttrs")}
          />
          Remove Empty Attributes
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeHiddenElems}
            onChange={handleChange("removeHiddenElems")}
          />
          Remove Hidden Elements
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeEmptyText}
            onChange={handleChange("removeEmptyText")}
          />
          Remove Empty Text
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeEmptyContainers}
            onChange={handleChange("removeEmptyContainers")}
          />
          Remove Empty Containers
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeViewBox}
            onChange={handleChange("removeViewBox")}
          />
          Remove View Box
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.cleanupEnableBackground}
            onChange={handleChange("cleanupEnableBackground")}
          />
          Cleanup Enable Background
        </label>
      </div>

      <div className="settings-group">
        <h4>Color Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.convertColors}
            onChange={handleChange("convertColors")}
          />
          Convert Colors
        </label>
      </div>

      <div className="settings-group">
        <h4>Path Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.convertPathData}
            onChange={handleChange("convertPathData")}
          />
          Convert Path Data
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.convertTransform}
            onChange={handleChange("convertTransform")}
          />
          Convert Transform
        </label>
      </div>

      <div className="settings-group">
        <h4>Cleanup Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.removeUnknownsAndDefaults}
            onChange={handleChange("removeUnknownsAndDefaults")}
          />
          Remove Unknowns and Defaults
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeNonInheritableGroupAttrs}
            onChange={handleChange("removeNonInheritableGroupAttrs")}
          />
          Remove Non-Inheritable Group Attributes
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeUselessStrokeAndFill}
            onChange={handleChange("removeUselessStrokeAndFill")}
          />
          Remove Useless Stroke and Fill
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.removeUnusedNs}
            onChange={handleChange("removeUnusedNs")}
          />
          Remove Unused NS
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.cleanupIds}
            onChange={handleChange("cleanupIds")}
          />
          Cleanup IDs
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.cleanupNumericValues}
            onChange={handleChange("cleanupNumericValues")}
          />
          Cleanup Numeric Values
        </label>
      </div>

      <div className="settings-group">
        <h4>Group Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.moveElemsAttrsToGroup}
            onChange={handleChange("moveElemsAttrsToGroup")}
          />
          Move Elements Attributes to Group
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.moveGroupAttrsToElems}
            onChange={handleChange("moveGroupAttrsToElems")}
          />
          Move Group Attributes to Elements
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.collapseGroups}
            onChange={handleChange("collapseGroups")}
          />
          Collapse Groups
        </label>
      </div>

      <div className="settings-group">
        <h4>Advanced Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.removeRasterImages}
            onChange={handleChange("removeRasterImages")}
          />
          Remove Raster Images
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.mergePaths}
            onChange={handleChange("mergePaths")}
          />
          Merge Paths
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.convertShapeToPath}
            onChange={handleChange("convertShapeToPath")}
          />
          Convert Shape to Path
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.sortAttrs}
            onChange={handleChange("sortAttrs")}
          />
          Sort Attributes
        </label>
      </div>

      <style jsx>{`
        .settings-panel {
          padding: 10px;
        }

        .settings-group {
          margin-bottom: 20px;
          padding: 15px;
          background: ${isDarkMode ? "#333333" : "#f5f5f5"};
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        h4 {
          margin-bottom: 15px;
          color: ${isDarkMode ? "#ffffff" : "#333333"};
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }

        label {
          display: block;
          margin: 8px 0;
          color: ${isDarkMode ? "#ffffff" : "#444444"};
          cursor: pointer;
          transition: all 0.2s;
        }

        label:hover {
          color: ${isDarkMode ? "#ffffff" : "#000000"};
        }

        input[type="checkbox"] {
          margin-right: 10px;
          cursor: pointer;
          accent-color: ${isDarkMode ? "#0070f3" : "#0070f3"};
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 2px solid ${isDarkMode ? "#555555" : "#cccccc"};
          transition: all 0.2s;
        }

        input[type="checkbox"]:checked {
          background-color: ${isDarkMode ? "#0070f3" : "#0070f3"};
          border-color: ${isDarkMode ? "#0070f3" : "#0070f3"};
        }

        input[type="checkbox"]:hover {
          border-color: ${isDarkMode ? "#0070f3" : "#0070f3"};
        }
      `}</style>
    </div>
  );
};

export default Settings;
