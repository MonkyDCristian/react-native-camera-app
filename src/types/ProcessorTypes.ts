export interface QRDetectionResult {
  detected: boolean;
  data: string | null;
  corners: [number, number][] | null;
  isCentered: boolean;
  confidence: number;
}

export interface DocumentDetectionResult {
  detected: boolean;
  corners: [number, number][] | null;
  confidence: number;
  area: number;
}

export interface ProcessorResult {
  qr?: QRDetectionResult;
  document?: DocumentDetectionResult;
  timestamp: number;
  frameWidth: number;
  frameHeight: number;
}

export interface MaskOverlay {
  type: 'qr-guide' | 'document-guide';
  color: string;
  opacity: number;
  corners?: [number, number][];
  centerGuide?: {
    x: number;
    y: number;
    size: number;
  };
} 