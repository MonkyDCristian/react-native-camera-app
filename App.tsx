/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Imports para la plataforma de cámara
import { ModeSelector } from './src/components/ModeSelector';
import { ImageCaptureMode } from './src/components/ImageCaptureMode';
import { ImageTransmissionMode } from './src/components/ImageTransmissionMode';
import { ImageScannerMode } from './src/components/ImageScannerMode';
import { ImageCorrectionMode } from './src/components/ImageCorrectionMode';
import { CameraMode } from './src/types/CameraTypes';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentMode, setCurrentMode] = useState<CameraMode>('capture');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Función para renderizar el componente actual según el modo
  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'capture':
        return <ImageCaptureMode />;
      case 'transmission':
        return <ImageTransmissionMode />;
      case 'scanner':
        return <ImageScannerMode />;
      case 'correction':
        return <ImageCorrectionMode />;
      default:
        return <ImageCaptureMode />;
    }
  };

  // Si hay un modo seleccionado que no sea 'capture', mostrar solo ese componente
  if (currentMode !== 'capture') {
    return (
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{ flex: 1 }}>
          <ModeSelector
            currentMode={currentMode}
            onModeChange={setCurrentMode}
          />
          {renderCurrentMode()}
        </View>
      </SafeAreaView>
    );
  }

  // Para el modo 'capture', mostrar la interfaz tradicional con el selector de modos
  const safePadding = isDarkMode ? 0 : 24;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          
          {/* Selector de modos de cámara */}
          <ModeSelector
            currentMode={currentMode}
            onModeChange={setCurrentMode}
          />
          
          {/* Renderizar el componente del modo actual */}
          {renderCurrentMode()}
          
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
