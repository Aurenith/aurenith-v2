"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string) => void;
  typedName: string;
}

export default function SignaturePad({
  onSignatureChange,
  typedName,
}: SignaturePadProps) {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#7C3AED");
  const [lineWidth, setLineWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const updateSignatureOutput = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (mode === "type") {
      // Create offscreen canvas to render stylized typed signature as PNG
      const offCanvas = document.createElement("canvas");
      offCanvas.width = 600;
      offCanvas.height = 200;
      const ctx = offCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, 600, 200);
        ctx.font = "italic 48px 'Syne', cursive, sans-serif";
        ctx.fillStyle = penColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(typedName || "Aurenith Member", 300, 100);
      }
      onSignatureChange(offCanvas.toDataURL("image/png"));
    } else {
      if (hasDrawn) {
        onSignatureChange(canvas.toDataURL("image/png"));
      } else {
        onSignatureChange("");
      }
    }
  }, [mode, typedName, penColor, hasDrawn, onSignatureChange]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSignatureChange("");
  };

  useEffect(() => {
    updateSignatureOutput();
  }, [mode, typedName, penColor, updateSignatureOutput]);

  // Handle canvas drawing listeners
  const startDrawing = (x: number, y: number) => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    updateSignatureOutput();
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => setMode("draw")}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "inherit",
              border: "1px solid",
              borderColor: mode === "draw" ? "#7C3AED" : "rgba(255,255,255,0.1)",
              background: mode === "draw" ? "rgba(124,58,237,0.2)" : "transparent",
              color: mode === "draw" ? "#A78BFA" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          >
            ✏️ Draw Signature
          </button>
          <button
            type="button"
            onClick={() => setMode("type")}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "inherit",
              border: "1px solid",
              borderColor: mode === "type" ? "#7C3AED" : "rgba(255,255,255,0.1)",
              background: mode === "type" ? "rgba(124,58,237,0.2)" : "transparent",
              color: mode === "type" ? "#A78BFA" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          >
            ⌨️ Type Stylized
          </button>
        </div>

        {mode === "draw" && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {["#7C3AED", "#DB2777", "#FFFFFF"].map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setPenColor(col)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: col,
                    border: penColor === col ? "2px solid #fff" : "none",
                    cursor: "pointer",
                  }}
                  title={`Color ${col}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={clearCanvas}
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#F87171",
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {mode === "draw" ? (
        <div style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={600}
            height={180}
            onMouseDown={(e) => {
              const { x, y } = getCoordinates(e);
              startDrawing(x, y);
            }}
            onMouseMove={(e) => {
              const { x, y } = getCoordinates(e);
              draw(x, y);
            }}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              const { x, y } = getCoordinates(e);
              startDrawing(x, y);
            }}
            onTouchMove={(e) => {
              const { x, y } = getCoordinates(e);
              draw(x, y);
            }}
            onTouchEnd={stopDrawing}
            style={{
              width: "100%",
              height: 180,
              background: "rgba(10,10,18,0.6)",
              border: "1px dashed rgba(255,255,255,0.15)",
              borderRadius: 12,
              cursor: "crosshair",
              touchAction: "none",
            }}
          />
          {!hasDrawn && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                fontSize: 13,
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Sign here using mouse or touch...
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            height: 180,
            background: "rgba(10,10,18,0.6)",
            border: "1px dashed rgba(255,255,255,0.15)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne), cursive, sans-serif",
              fontStyle: "italic",
              fontSize: 36,
              color: penColor,
              letterSpacing: "0.02em",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {typedName || "Aurenith Team Member"}
          </div>
        </div>
      )}
    </div>
  );
}
