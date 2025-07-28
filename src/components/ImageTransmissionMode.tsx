import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const ImageTransmissionMode: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [socketUrl, setSocketUrl] = useState('ws://192.168.1.100:8080');

  const handleStartStreaming = () => {
    if (isStreaming) {
      console.log('📡 Stopping stream...');
      setIsStreaming(false);
    } else {
      console.log('📡 Starting stream to:', socketUrl);
      setIsStreaming(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📡 Transmission Mode</Text>
        <Text style={styles.description}>
          Transmisión de frames en tiempo real
        </Text>
      </View>

      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>
          Aquí irá el stream de cámara
        </Text>
        <Text style={styles.placeholderSubtext}>
          Transmisión en tiempo real
        </Text>
        {isStreaming && (
          <View style={styles.streamingIndicator}>
            <View style={styles.streamingDot} />
            <Text style={styles.streamingText}>STREAMING</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Socket URL:</Text>
          <TextInput
            style={styles.input}
            value={socketUrl}
            onChangeText={setSocketUrl}
            placeholder="ws://ip:port"
            editable={!isStreaming}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.streamButton,
            isStreaming && styles.streamButtonActive,
          ]}
          onPress={handleStartStreaming}
          activeOpacity={0.8}
        >
          <Text style={styles.streamButtonText}>
            {isStreaming ? 'Stop Stream' : 'Start Stream'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Características:</Text>
        <Text style={styles.feature}>• Socket connection para streaming</Text>
        <Text style={styles.feature}>• Configuración de calidad y FPS</Text>
        <Text style={styles.feature}>• Conexión a dispositivo externo</Text>
        <Text style={styles.feature}>• Monitor de latencia en tiempo real</Text>
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
    color: '#2196F3',
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
    borderColor: '#ccc',
    position: 'relative',
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
  streamingIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streamingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  streamingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  controls: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  streamButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  streamButtonActive: {
    backgroundColor: '#f44336',
  },
  streamButtonText: {
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