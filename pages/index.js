import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Home() {
  const [svgCode, setSvgCode] = useState("");
  const [reactNativeCode, setReactNativeCode] = useState("");
  const [error, setError] = useState("");
  const [showCopyButton, setShowCopyButton] = useState(false);

  const convertSvgToReactNative = () => {
    try {
      // Extract width and height from SVG
      const widthMatch = svgCode.match(/width="([^"]+)"/);
      const heightMatch = svgCode.match(/height="([^"]+)"/);
      const viewBoxMatch = svgCode.match(/viewBox="([^"]+)"/);

      // Basic conversion logic
      let convertedCode = svgCode
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
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reactNativeCode);
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

      <main>
        <h1>SVGTorn - SVG to React Native Converter</h1>

        <div className="editor-container">
          <div className="editor">
            <h2>SVG Input</h2>
            <MonacoEditor
              height="500px"
              defaultLanguage="xml"
              value={svgCode}
              onChange={setSvgCode}
              theme="vs-dark"
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
              theme="vs-dark"
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
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        h1 {
          margin-bottom: 2rem;
          text-align: center;
        }

        .editor-container {
          display: flex;
          gap: 2rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .editor {
          flex: 1;
          min-width: 0;
          position: relative;
        }

        .editor h2 {
          margin-bottom: 0.5rem;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .error {
          color: red;
          margin-top: 1rem;
        }

        .copy-button {
          position: absolute;
          top: 50px;
          right: 10px;
          z-index: 100;
          padding: 8px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          transition: background 0.2s;
        }

        .copy-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .output-editor {
          position: relative;
        }
      `}</style>
    </div>
  );
}
