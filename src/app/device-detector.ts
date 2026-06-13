import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetector {
  hasMicDevice = signal<boolean | null>(null);
  micPermission = signal<string | null>(null);
  hasCameraDevice = signal<boolean | null>(null);
  cameraPermission = signal<string | null>(null);

  async initPermissions() {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      try {
        // Request initial access to list unified prompts
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          stream.getTracks().forEach(t => t.stop());
        } catch {
          // Ignore denials/device support discrepancies initially
        }

        if (navigator.mediaDevices.addEventListener) {
          navigator.mediaDevices.addEventListener('devicechange', () => {
            this.checkMicStatus();
            this.checkCameraStatus();
          });
        }
        await this.checkMicStatus();
        await this.checkCameraStatus();

        if (navigator.permissions) {
          try {
            const permissionsObj = navigator.permissions as unknown as { query: (desc: { name: string }) => Promise<PermissionStatus> };
            if (typeof permissionsObj.query === 'function') {
              const permMic = await permissionsObj.query({ name: 'microphone' });
              this.micPermission.set(permMic.state);
              permMic.onchange = () => this.micPermission.set(permMic.state);
            }
          } catch {
            // Safari permissions fallback
          }
          try {
            const permissionsObj = navigator.permissions as unknown as { query: (desc: { name: string }) => Promise<PermissionStatus> };
            if (typeof permissionsObj.query === 'function') {
              const permCam = await permissionsObj.query({ name: 'camera' });
              this.cameraPermission.set(permCam.state);
              permCam.onchange = () => this.cameraPermission.set(permCam.state);
            }
          } catch {
            // Safari permissions fallback
          }
        }
      } catch {
        // Safe query guard
      }
    }
  }

  async checkMicStatus() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasMic = devices.some(d => d.kind === 'audioinput');
      this.hasMicDevice.set(hasMic);
    } catch {
      this.hasMicDevice.set(null);
    }
  }

  async checkCameraStatus() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(d => d.kind === 'videoinput');
      this.hasCameraDevice.set(hasCamera);
    } catch {
      this.hasCameraDevice.set(null);
    }
  }
}
