import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CameraMode, CameraModeConfig } from '../types/CameraTypes';

interface ModeSelectorProps {
  currentMode: CameraMode;
  onModeChange: (mode: CameraMode) => void;
}

const modeConfigs: Record<CameraMode, CameraModeConfig> = {
  capture: {
    title: 'Capture',
    description: 'Captura básica de fotos',
    icon: '📸',
    color: '#4CAF50',
  },
  transmission: {
    title: 'Transmission',
    description: 'Streaming en tiempo real',
    icon: '📡',
    color: '#2196F3',
  },
  scanner: {
    title: 'Scanner',
    description: 'Detección de QR codes',
    icon: '🔍',
    color: '#FF9800',
  },
  correction: {
    title: 'Correction',
    description: 'Procesamiento avanzado',
    icon: '⚙️',
    color: '#9C27B0',
  },
};

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Camera Modes</Text>
      <View style={styles.buttonContainer}>
        {(Object.keys(modeConfigs) as CameraMode[]).map((mode) => {
          const config = modeConfigs[mode];
          const isActive = currentMode === mode;
          
          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                isActive && { backgroundColor: config.color },
                { borderColor: config.color },
              ]}
              onPress={() => onModeChange(mode)}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>{config.icon}</Text>
              <Text
                style={[
                  styles.modeTitle,
                  isActive && styles.activeModeTitle,
                ]}
              >
                {config.title}
              </Text>
              <Text
                style={[
                  styles.modeDescription,
                  isActive && styles.activeModeDescription,
                ]}
              >
                {config.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  modeButton: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  modeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  activeModeTitle: {
    color: '#fff',
  },
  modeDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  activeModeDescription: {
    color: '#fff',
    opacity: 0.9,
  },
}); 