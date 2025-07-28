import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export const ImageCorrectionMode: React.FC = () => {
  const [qrDetected, setQrDetected] = useState(false);
  const [qrCentered, setQrCentered] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'completed'>('idle');

  // Simulación de detección y procesamiento de QR
  const simulateQRProcessing = () => {
    const detected = !qrDetected;
    const centered = detected && Math.random() > 0.5;
    const data = detected ? 'https://example.com/document/12345' : null;
    
    setQrDetected(detected);
    setQrCentered(centered);
    setQrData(data);
    
    if (detected && centered) {
      setProcessingStatus('processing');
      
      // Simular procesamiento de imagen
      setTimeout(() => {
        setProcessingStatus('completed');
        console.log('⚙️ Image processing completed');
      }, 2000);
    } else {
      setProcessingStatus('idle');
    }
    
    console.log('⚙️ QR Processing:', { detected, centered, data });
  };

  const getStatusColor = () => {
    if (!qrDetected) return '#f44336';
    if (!qrCentered) return '#FF9800';
    return '#4CAF50';
  };

  const getMaskColor = () => {
    if (!qrDetected) return '#999999';
    if (!qrCentered) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Correction Mode</Text>
        <Text style={styles.description}>
          Detección QR + procesamiento avanzado de imagen
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.placeholderText}>
            Cámara + Frame Processor + OpenCV
          </Text>
          <Text style={styles.placeholderSubtext}>
            Detección y corrección en tiempo real
          </Text>
          
          {processingStatus === 'processing' && (
            <View style={styles.processingIndicator}>
              <Text style={styles.processingText}>Procesando imagen...</Text>
            </View>
          )}
        </View>
        
        {/* Máscara guía con corrección */}
        <View style={styles.maskOverlay}>
          <View 
            style={[
              styles.qrGuide, 
              { borderColor: getMaskColor() }
            ]}
          >
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
            
            {processingStatus === 'completed' && (
              <View style={styles.processingComplete}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.guideText, { color: getMaskColor() }]}>
            {processingStatus === 'processing' ? 'PROCESANDO...' :
             processingStatus === 'completed' ? 'COMPLETADO ✓' :
             qrCentered ? 'QR LISTO PARA PROCESAR' : 
             qrDetected ? 'CENTRA EL QR' : 'BUSCA UN CÓDIGO QR'}
          </Text>
        </View>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusTitle}>Estado del Sistema:</Text>
        
        <View style={styles.statusGrid}>
          <View style={styles.statusCard}>
            <Text style={styles.statusCardTitle}>QR Detectado</Text>
            <Text style={[styles.statusCardValue, { color: qrDetected ? '#4CAF50' : '#f44336' }]}>
              {qrDetected ? '✓ Sí' : '✗ No'}
            </Text>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusCardTitle}>Posición</Text>
            <Text style={[styles.statusCardValue, { color: qrCentered ? '#4CAF50' : '#FF9800' }]}>
              {qrCentered ? '✓ Centrado' : '○ Descentrado'}
            </Text>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusCardTitle}>Procesamiento</Text>
            <Text style={[
              styles.statusCardValue, 
              { color: 
                processingStatus === 'completed' ? '#4CAF50' :
                processingStatus === 'processing' ? '#FF9800' : '#666'
              }
            ]}>
              {processingStatus === 'completed' ? '✓ Completo' :
               processingStatus === 'processing' ? '⟳ En proceso' : '○ Inactivo'}
            </Text>
          </View>
        </View>

        {qrData && (
          <View style={styles.qrDataContainer}>
            <Text style={styles.qrDataTitle}>QR identificado:</Text>
            <Text style={styles.qrDataValue}>{qrData}</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.processButton, { backgroundColor: getMaskColor() }]}
          onPress={simulateQRProcessing}
          activeOpacity={0.8}
        >
          <Text style={styles.processButtonText}>
            {processingStatus === 'processing' ? 'Procesando...' : 'Simular Detección + Proceso'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Algoritmos Activos:</Text>
        <Text style={styles.feature}>• Detección de QR (hereda del Scanner Mode)</Text>
        <Text style={styles.feature}>• Procesamiento de imagen post-detección</Text>
        <Text style={styles.feature}>• Corrección de perspectiva con OpenCV</Text>
        <Text style={styles.feature}>• Análisis y decodificación completa</Text>
        <Text style={styles.feature}>• Reducción de ruido y mejora de calidad</Text>
      </View>
    </ScrollView>
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
    color: '#9C27B0',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  cameraContainer: {
    height: 300,
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
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  processingIndicator: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  processingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
    width: 180,
    height: 180,
    borderWidth: 3,
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 25,
    height: 25,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'inherit',
  },
  cornerTR: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 25,
    height: 25,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: 'inherit',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -3,
    left: -3,
    width: 25,
    height: 25,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'inherit',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 25,
    height: 25,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: 'inherit',
  },
  processingComplete: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  guideText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  status: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statusCardTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  statusCardValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  qrDataContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  qrDataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  qrDataValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontFamily: 'monospace',
  },
  controls: {
    padding: 20,
    alignItems: 'center',
  },
  processButton: {
    padding: 15,
    borderRadius: 8,
    paddingHorizontal: 30,
    minWidth: 200,
    alignItems: 'center',
  },
  processButtonText: {
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