import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SignatureCanvasProps {
  onSignatureChange?: (hasSignature: boolean) => void;
}

export interface SignatureCanvasRef {
  clearCanvas: () => void;
  saveAsPNG: () => void;
  hasSignature: boolean;
}

export const SignatureCanvas = React.forwardRef<SignatureCanvasRef, SignatureCanvasProps>(
  ({ onSignatureChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const newWidth = Math.min(containerWidth - 4, 600); // Account for border
      const newHeight = Math.floor(newWidth * 0.42); // Maintain aspect ratio

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Redraw after resize
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#111827';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }, []);

    useEffect(() => {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }, [resizeCanvas]);

    const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      
      if ('touches' in e) {
        const touch = e.touches[0] || e.changedTouches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      setIsDrawing(true);
      const pos = getEventPos(e);
      
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      const pos = getEventPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      if (!hasSignature) {
        setHasSignature(true);
        onSignatureChange?.(true);
      }
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const clearCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
      onSignatureChange?.(false);
    }, [onSignatureChange]);

    const saveAsPNG = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = 'توقيع.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, []);

    React.useImperativeHandle(ref, () => ({
      clearCanvas,
      saveAsPNG,
      hasSignature
    }), [clearCanvas, saveAsPNG, hasSignature]);

    return (
      <canvas
        ref={canvasRef}
        className="signature-canvas bg-white canvas-3d w-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ touchAction: 'none' }}
      />
    );
  }
);

SignatureCanvas.displayName = 'SignatureCanvas';