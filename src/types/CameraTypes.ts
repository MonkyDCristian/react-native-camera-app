export type CameraMode = 
  | 'capture' 
  | 'transmission' 
  | 'scanner' 
  | 'correction';

export interface CameraModeConfig {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface CaptureSettings {
  quality: 'low' | 'medium' | 'high';
  format: 'jpg' | 'png';
  enableFlash: boolean;
  enableHDR: boolean;
}

export interface TransmissionSettings {
  socketUrl: string;
  fps: number;
  quality: number;
  compression: 'none' | 'low' | 'medium' | 'high';
}

export interface ScannerSettings {
  maskOpacity: number;
  detectionSensitivity: number;
  centeringTolerance: number;
}

export interface CorrectionSettings extends ScannerSettings {
  enablePerspectiveCorrection: boolean;
  enableNoiseReduction: boolean;
  outputFormat: 'original' | 'corrected' | 'both';
} 