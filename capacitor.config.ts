import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teyssir.erp',
  appName: 'Teyssir ERP',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: { launchShowDuration: 900, backgroundColor: '#123b68', showSpinner: false },
    StatusBar: { style: 'DARK', backgroundColor: '#f6f8fb' },
    Keyboard: { resize: 'body', style: 'DARK' }
  }
};
export default config;
