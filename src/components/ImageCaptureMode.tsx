import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';
import * as MediaLibrary from 'expo-media-library';

export const ImageCaptureMode: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>('back');
  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
  const { hasPermission: hasMicrophonePermission, requestPermission: requestMicrophonePermission } = useMicrophonePermission();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === cameraPosition);
  const cameraRef = useRef<Camera>(null);

  // Frame processor básico (opcional para demostrar capacidades)
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    // Aquí puedes procesar frames en tiempo real
    // console.log(`Frame: ${frame.width}x${frame.height}`)
  }, []);

  const handleSelectCamera = async () => {
    console.log('🔄 Seleccionando cámara...');
    
    // Verificar permisos de cámara
    if (!hasCameraPermission) {
      console.log('📱 Solicitando permisos de cámara...');
      const cameraPermissionResult = await requestCameraPermission();
      if (!cameraPermissionResult) {
        Alert.alert('Permisos requeridos', 'Se necesitan permisos de cámara para continuar');
        return;
      }
    }

    // Verificar permisos de micrófono
    if (!hasMicrophonePermission) {
      console.log('🎤 Solicitando permisos de micrófono...');
      const micPermissionResult = await requestMicrophonePermission();
      if (!micPermissionResult) {
        Alert.alert('Permisos requeridos', 'Se necesitan permisos de micrófono para videos');
        // Continuar sin micrófono para solo fotos
      }
    }

    // Verificar permisos de galería
    if (!mediaLibraryPermission?.granted) {
      console.log('🖼️ Solicitando permisos de galería...');
      const result = await requestMediaLibraryPermission();
      if (!result?.granted) {
        Alert.alert('Permisos requeridos', 'Se necesitan permisos de galería para guardar fotos');
        return;
      }
    }

    console.log('✅ Todos los permisos otorgados, abriendo cámara...');
    setShowCamera(true);
  };

  const handleBackToMenu = useCallback(() => {
    console.log('🔙 Volviendo al menú...');
    setShowCamera(false);
  }, []);

  const handleTakePhoto = useCallback(async () => {
    console.log('📸 Tomando foto...');
    
    if (!cameraRef.current) {
      console.log('❌ Referencia de cámara no disponible');
      return;
    }

    try {
      console.log('📷 Capturando foto...');
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });

      console.log('✅ Foto capturada:', photo.path);

      if (photo.path) {
        // Guardar en la galería
        await MediaLibrary.saveToLibraryAsync(photo.path);
        console.log('💾 Foto guardada en galería');
        Alert.alert('¡Éxito!', 'Foto guardada en la galería');
      }
    } catch (error) {
      console.error('❌ Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto: ' + (error as Error).message);
    }
  }, []);

  const toggleCameraFacing = useCallback(() => {
    console.log('🔄 Cambiando cámara...');
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
  }, []);

  // Vista de la cámara con react-native-vision-camera
  if (showCamera) {
    if (!device) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ Cámara no disponible</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>← Volver al Menú</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={showCamera}
          photo={true}
          video={false}
          frameProcessor={frameProcessor}
        />
        
        {/* Controles superiores - Absolute positioning */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>← Volver al Menú</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
            activeOpacity={0.8}
          >
            <Text style={styles.controlButtonText}>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Controles inferiores - Absolute positioning */}
        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePhoto}
            activeOpacity={0.8}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>

        {/* Indicador de modo */}
        <View style={styles.modeIndicator}>
          <Text style={styles.modeText}>VisionCamera + Frame Processor</Text>
          <Text style={styles.modeSubtext}>🎯 {cameraPosition === 'back' ? 'Cámara Trasera' : 'Cámara Frontal'}</Text>
        </View>
      </View>
    );
  }

  // Vista del menú principal
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📸 Capture Mode</Text>
        <Text style={styles.description}>
          react-native-vision-camera + Frame Processors
        </Text>
      </View>

      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>
          🎯 VisionCamera Lista
        </Text>
        <Text style={styles.placeholderSubtext}>
          react-native-vision-camera con Frame Processors
        </Text>
        <Text style={styles.warningText}>
          ⚠️ Requiere Development Build
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={handleSelectCamera}
          activeOpacity={0.8}
        >
          <Text style={styles.selectButtonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Características VisionCamera:</Text>
        <Text style={styles.feature}>• ✅ Frame Processors en tiempo real</Text>
        <Text style={styles.feature}>• ✅ Captura de fotos de alta calidad</Text>
        <Text style={styles.feature}>• ✅ Compatible con OpenCV</Text>
        <Text style={styles.feature}>• ✅ Máximo rendimiento nativo</Text>
        <Text style={styles.feature}>• ✅ Control total de la cámara</Text>
        <Text style={styles.feature}>• ⚠️ Requiere Development Build</Text>
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
    color: '#4CAF50',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  placeholderText: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 5,
    fontWeight: '600',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    textAlign: 'center',
  },
  controls: {
    padding: 20,
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
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
  // Estilos para la vista de cámara
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#f44336',
    marginBottom: 20,
    textAlign: 'center',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  flipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  modeIndicator: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  modeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modeSubtext: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
}); 