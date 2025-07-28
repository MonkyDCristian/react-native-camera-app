import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const ImageScannerMode: React.FC = () => {
  const [qrDetected, setQrDetected] = useState(false);
  const [qrCentered, setQrCentered] = useState(false);
  const [maskColor, setMaskColor] = useState('#999999');

  // Simulación de detección de QR (será reemplazado por Frame Processor)
  const simulateQRDetection = () => {
    const detected = !qrDetected;
    const centered = detected && Math.random() > 0.5;
    
    setQrDetected(detected);
    setQrCentered(centered);
    setMaskColor(centered ? '#4CAF50' : '#999999');
    
    console.log('🔍 QR Detection:', { detected, centered });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Scanner Mode</Text>
        <Text style={styles.description}>
          Detección de QR codes con máscara guía
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.placeholderText}>
            Aquí irá la cámara con Frame Processor
          </Text>
          <Text style={styles.placeholderSubtext}>
            Detección de QR en tiempo real
          </Text>
        </View>
        
        {/* Máscara guía */}
        <View style={styles.maskOverlay}>
          <View 
            style={[
              styles.qrGuide, 
              { borderColor: maskColor }
            ]}
          >
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <Text style={[styles.guideText, { color: maskColor }]}>
            {qrCentered ? 'QR CENTRADO ✓' : 'Centra el código QR'}
          </Text>
        </View>
      </View>

      <View style={styles.status}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Estado QR:</Text>
          <Text style={[
            styles.statusValue,
            { color: qrDetected ? '#4CAF50' : '#f44336' }
          ]}>
            {qrDetected ? 'Detectado' : 'No detectado'}
          </Text>
        </View>
        
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Posición:</Text>
          <Text style={[
            styles.statusValue,
            { color: qrCentered ? '#4CAF50' : '#FF9800' }
          ]}>
            {qrCentered ? 'Centrado' : 'Descentrado'}
          </Text>
        </View>
        
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Máscara:</Text>
          <View style={[styles.colorIndicator, { backgroundColor: maskColor }]} />
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.testButton}
          onPress={simulateQRDetection}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>
            Simular Detección QR
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Características:</Text>
        <Text style={styles.feature}>• Frame processor para detección en tiempo real</Text>
        <Text style={styles.feature}>• Máscara gris/verde adaptativa</Text>
        <Text style={styles.feature}>• Feedback visual cuando QR está centrado</Text>
        <Text style={styles.feature}>• Algoritmo de posicionamiento automático</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    position: 'relative',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  maskOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrGuide: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 12,
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 30,
    height: 30,
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderColor: 'inherit',
  },
  cornerTR: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 30,
    height: 30,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderColor: 'inherit',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -3,
    left: -3,
    width: 30,
    height: 30,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderColor: 'inherit',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 30,
    height: 30,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderColor: 'inherit',
  },
  guideText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  status: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  controls: {
    padding: 20,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
}); 