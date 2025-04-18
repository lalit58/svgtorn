import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Settings from "../components/Settings";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Home() {
  const [svgCode, setSvgCode] = useState("");
  const [reactNativeCode, setReactNativeCode] = useState("");
  const [error, setError] = useState("");
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [settings, setSettings] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme on mount and when it changes
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const optimizeSvg = (svg, settings) => {
    let optimizedSvg = svg;

    // Basic optimizations
    if (settings.removeTitle) {
      optimizedSvg = optimizedSvg.replace(/<title>.*?<\/title>/g, "");
    }
    if (settings.removeDesc) {
      optimizedSvg = optimizedSvg.replace(/<desc>.*?<\/desc>/g, "");
    }
    if (settings.removeUselessDefs) {
      optimizedSvg = optimizedSvg.replace(/<defs>.*?<\/defs>/g, "");
    }
    if (settings.removeEditorsNsData) {
      optimizedSvg = optimizedSvg.replace(/xmlns:.*?=".*?"/g, "");
    }
    if (settings.removeEmptyAttrs) {
      optimizedSvg = optimizedSvg.replace(/\s+[a-zA-Z-]+=""/g, "");
    }
    if (settings.removeHiddenElems) {
      optimizedSvg = optimizedSvg.replace(
        /<[^>]+display="none"[^>]*>.*?<\/[^>]+>/g,
        ""
      );
    }
    if (settings.removeEmptyText) {
      optimizedSvg = optimizedSvg.replace(/<text[^>]*>\s*<\/text>/g, "");
    }
    if (settings.removeEmptyContainers) {
      optimizedSvg = optimizedSvg.replace(/<g[^>]*>\s*<\/g>/g, "");
    }
    if (settings.removeViewBox) {
      optimizedSvg = optimizedSvg.replace(/viewBox="[^"]*"/g, "");
    }

    // Color optimizations
    if (settings.convertColors) {
      optimizedSvg = optimizedSvg.replace(
        /#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi,
        "#$1$2$3"
      );
    }

    // Path optimizations
    if (settings.convertPathData) {
      // Add path data optimization logic here
    }

    // Cleanup optimizations
    if (settings.removeUnknownsAndDefaults) {
      optimizedSvg = optimizedSvg.replace(/<[^>]+>/g, (match) => {
        return match.replace(/\s+[a-zA-Z-]+="[^"]*"/g, (attr) => {
          if (
            attr.includes("xmlns:") ||
            attr.includes("sodipodi:") ||
            attr.includes("inkscape:")
          ) {
            return "";
          }
          return attr;
        });
      });
    }

    return optimizedSvg;
  };

  const convertSvgToReactNative = () => {
    try {
      if (!svgCode.trim()) {
        // If SVG is empty, show a default component
        const defaultComponent = `import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#000',
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={style}
    >
      <Path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
};

export default Icon;`;
        setReactNativeCode(defaultComponent);
        setError("");
        return;
      }

      // Extract width and height from SVG
      const widthMatch = svgCode.match(/width="([^"]+)"/);
      const heightMatch = svgCode.match(/height="([^"]+)"/);
      const viewBoxMatch = svgCode.match(/viewBox="([^"]+)"/);

      // Optimize SVG based on settings
      const optimizedSvg = optimizeSvg(svgCode, settings);

      // Basic conversion logic
      let convertedCode = optimizedSvg
        .replace(/<svg([^>]*)>/g, "<Svg$1>")
        .replace(/<\/svg>/g, "</Svg>")
        .replace(/<path([^>]*)>/g, "<Path$1>")
        .replace(/<\/path>/g, "</Path>")
        .replace(/<circle([^>]*)>/g, "<Circle$1>")
        .replace(/<\/circle>/g, "</Circle>")
        .replace(/<rect([^>]*)>/g, "<Rect$1>")
        .replace(/<\/rect>/g, "</Rect>")
        .replace(/<line([^>]*)>/g, "<Line$1>")
        .replace(/<\/line>/g, "</Line>")
        .replace(/<polygon([^>]*)>/g, "<Polygon$1>")
        .replace(/<\/polygon>/g, "</Polygon>")
        .replace(/<polyline([^>]*)>/g, "<Polyline$1>")
        .replace(/<\/polyline>/g, "</Polyline>")
        .replace(/<text([^>]*)>/g, "<Text$1>")
        .replace(/<\/text>/g, "</Text>")
        .replace(/<g([^>]*)>/g, "<G$1>")
        .replace(/<\/g>/g, "</G>");

      // Create component with props
      const componentCode = `import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polygon, Polyline, Text, G } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  width = ${widthMatch ? widthMatch[1] : "24"},
  height = ${heightMatch ? heightMatch[1] : "24"},
  color = '#000',
  style,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="${viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24"}"
      style={style}
    >
      ${convertedCode.replace(/<Svg[^>]*>/, "").replace(/<\/Svg>/, "")}
    </Svg>
  );
};

export default Icon;`;

      setReactNativeCode(componentCode);
      setError("");
    } catch (err) {
      setError("Error converting SVG: " + err.message);
      setReactNativeCode("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reactNativeCode);
  };

  const clearAll = () => {
    setSvgCode("");
    setReactNativeCode("");
    setError("");
  };

  const handleCopySvg = () => {
    if (svgCode) {
      navigator.clipboard.writeText(svgCode);
    }
  };

  const handleDownloadSvg = () => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "icon.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      setError("No SVG code to download");
    }
  };

  const handleResetSettings = () => {
    setSettings({
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
    setError("Settings have been reset to default values");
  };

  const handleSavePreset = () => {
    try {
      if (Object.keys(settings).length === 0) {
        setError("No settings to save as preset");
        return;
      }

      const presetName = prompt("Enter a name for this preset:");
      if (!presetName) return;

      const presets = JSON.parse(localStorage.getItem("svgPresets") || "{}");
      presets[presetName] = settings;
      localStorage.setItem("svgPresets", JSON.stringify(presets));
      setError(`Preset "${presetName}" saved successfully`);
    } catch (err) {
      setError("Error saving preset: " + err.message);
    }
  };

  const handleLoadPreset = (presetName) => {
    try {
      const presets = JSON.parse(localStorage.getItem("svgPresets") || "{}");
      if (presets[presetName]) {
        setSettings(presets[presetName]);
        setError(`Preset "${presetName}" loaded successfully`);
      } else {
        setError(`Preset "${presetName}" not found`);
      }
    } catch (err) {
      setError("Error loading preset: " + err.message);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container">
      <Head>
        <title>SVGTorn - SVG to React Native Converter</title>
        <meta
          name="description"
          content="Convert SVG to React Native SVG code"
        />
      </Head>

      <Header
        onSettingsClick={() => setIsSettingsOpen(true)}
        onClearClick={clearAll}
        isDarkMode={isDarkMode}
      />

      <Sidebar
        onCopySvg={handleCopySvg}
        onDownloadSvg={handleDownloadSvg}
        onResetSettings={handleResetSettings}
        onSavePreset={handleSavePreset}
        onLoadPreset={handleLoadPreset}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <main>
        <div className="content">
          <div className="editor-section">
            <div className="editor-container">
              <div className="editor">
                <h2>SVG Input</h2>
                <MonacoEditor
                  height="500px"
                  defaultLanguage="xml"
                  value={svgCode}
                  onChange={setSvgCode}
                  theme={isDarkMode ? "vs-dark" : "light"}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>

              <div
                className="editor output-editor"
                onMouseEnter={() => setShowCopyButton(true)}
                onMouseLeave={() => setShowCopyButton(false)}
              >
                <h2>React Native Component</h2>
                <MonacoEditor
                  height="500px"
                  defaultLanguage="typescript"
                  value={reactNativeCode}
                  theme={isDarkMode ? "vs-dark" : "light"}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: true,
                  }}
                />
                {showCopyButton && reactNativeCode && (
                  <button
                    className="copy-button"
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                )}
              </div>
            </div>

            <div className="controls">
              <button onClick={convertSvgToReactNative}>Convert</button>
            </div>

            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </main>

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
      >
        <Settings onSettingsChange={setSettings} isDarkMode={isDarkMode} />
      </Modal>

      <style jsx>{`
        :root {
          --bg-color: ${isDarkMode ? "#121212" : "#ffffff"};
          --text-color: ${isDarkMode ? "#ffffff" : "#333333"};
          --text-secondary: ${isDarkMode ? "#b0b0b0" : "#666666"};
          --border-color: ${isDarkMode ? "#333333" : "#e0e0e0"};
          --button-bg: ${isDarkMode ? "#2a2a2a" : "#f5f5f5"};
          --button-hover-bg: ${isDarkMode ? "#3a3a3a" : "#e0e0e0"};
          --modal-bg: ${isDarkMode ? "#1e1e1e" : "#ffffff"};
          --sidebar-bg: ${isDarkMode ? "#1a1a1a" : "#f5f5f5"};
          --theme-toggle-bg: ${isDarkMode ? "#333333" : "#e0e0e0"};
          --text-hover: ${isDarkMode ? "#ffffff" : "#000000"};
          --editor-bg: ${isDarkMode ? "#1e1e1e" : "#ffffff"};
          --editor-border: ${isDarkMode ? "#333333" : "#e0e0e0"};
          --error-color: ${isDarkMode ? "#ff6b6b" : "#ff4444"};
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          background: var(--bg-color);
          color: var(--text-color);
          transition: all 0.3s ease;
        }

        main {
          padding: 80px 20px 20px 220px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          background: var(--bg-color);
        }

        h1 {
          margin-bottom: 2rem;
          text-align: center;
          color: var(--text-color);
        }

        .content {
          display: flex;
          gap: 2rem;
          width: 100%;
          background: var(--bg-color);
        }

        .editor-section {
          flex: 1;
          min-width: 0;
          background: var(--bg-color);
        }

        .editor-container {
          display: flex;
          gap: 2rem;
          width: 100%;
          margin-bottom: 2rem;
          background: var(--bg-color);
        }

        .editor {
          flex: 1;
          min-width: 0;
          position: relative;
          background: var(--editor-bg);
          border: 1px solid var(--editor-border);
          border-radius: 8px;
          padding: 1rem;
        }

        .editor h2 {
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          background: var(--bg-color);
        }

        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          background-color: var(--button-bg);
          color: var(--text-color);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          transition: all 0.2s;
        }

        button:hover {
          background-color: var(--button-hover-bg);
        }

        button:disabled {
          background-color: var(--text-secondary);
          cursor: not-allowed;
        }

        .error {
          color: var(--error-color);
          margin-top: 1rem;
          background: var(--bg-color);
        }

        .copy-button {
          position: absolute;
          top: 50px;
          right: 10px;
          z-index: 100;
          padding: 8px;
          background: ${isDarkMode
            ? "rgba(42, 42, 42, 0.7)"
            : "rgba(245, 245, 245, 0.7)"};
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-color);
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s;
        }

        .copy-button:hover {
          background: ${isDarkMode
            ? "rgba(42, 42, 42, 0.9)"
            : "rgba(245, 245, 245, 0.9)"};
        }

        .output-editor {
          position: relative;
          background: var(--editor-bg);
        }
      `}</style>
    </div>
  );
}
