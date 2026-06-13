export interface CameraOverlayConfig {
  isCameraEnabled: boolean;
  cameraPos: { x: number; y: number };
  cameraSize: number;
  windowWidth: number;
  windowHeight: number;
}

export class CanvasMixer {
  /**
   * Draws the screen sharing frames and composites the webcam feeds onto the target canvas ctx.
   */
  static drawFrame(
    canvasCtx: CanvasRenderingContext2D,
    canvasEle: HTMLCanvasElement,
    displayVideo: HTMLVideoElement,
    camVideoEl: HTMLVideoElement | null,
    config: CameraOverlayConfig
  ) {
    try {
      // 1. Render the main display background
      canvasCtx.drawImage(displayVideo, 0, 0, canvasEle.width, canvasEle.height);

      // 2. Overlay camera circle if enabled and ready
      if (config.isCameraEnabled && camVideoEl && camVideoEl.readyState >= 2) {
        const windowW = config.windowWidth || 1920;
        const windowH = config.windowHeight || 1080;

        const relX = config.cameraPos.x / windowW;
        const relY = config.cameraPos.y / windowH;
        const scale = canvasEle.height / windowH;
        const camRadius = (config.cameraSize / 2) * scale;

        let x = relX * canvasEle.width;
        let y = relY * canvasEle.height;

        // Constraint camera within canvas boundaries
        x = Math.max(camRadius, Math.min(x + camRadius, canvasEle.width - camRadius)) - camRadius;
        y = Math.max(camRadius, Math.min(y + camRadius, canvasEle.height - camRadius)) - camRadius;

        canvasCtx.save();
        canvasCtx.beginPath();
        canvasCtx.arc(x + camRadius, y + camRadius, camRadius, 0, Math.PI * 2);
        canvasCtx.closePath();
        canvasCtx.clip();

        const vW = camVideoEl.videoWidth;
        const vH = camVideoEl.videoHeight;
        const aspect = vW / vH;
        const targetSize = camRadius * 2;
        let sW = vW;
        let sH = vH;

        if (aspect > 1) {
          sW = vH; // crop horizontal sides
        } else {
          sH = vW; // crop vertical sides
        }

        // Mirror camera preview
        canvasCtx.translate(x + targetSize / 2, y + targetSize / 2);
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-(x + targetSize / 2), -(y + targetSize / 2));

        canvasCtx.drawImage(
          camVideoEl,
          (vW - sW) / 2,
          (vH - sH) / 2,
          sW,
          sH,
          x,
          y,
          targetSize,
          targetSize
        );

        canvasCtx.restore();

        // Stroke rounded circle boundary
        canvasCtx.save();
        canvasCtx.beginPath();
        canvasCtx.arc(x + camRadius, y + camRadius, camRadius, 0, Math.PI * 2);
        canvasCtx.lineWidth = 2 * scale;
        canvasCtx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
        canvasCtx.stroke();
        canvasCtx.restore();
      }
    } catch {
      // Guard silently during stream transitions
    }
  }
}
