import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

function detectHost() {
  // If running inside Expo client with a debuggerHost available, use that host
  try {
    const manifest = Constants.manifest || Constants.expoConfig;
    if (manifest && manifest.debuggerHost) {
      return manifest.debuggerHost.split(':')[0];
    }
  } catch (e) {
    // ignore
  }

  // Android emulator common localhost alias
  if (Platform.OS === 'android') return '10.0.2.2';

  // default to localhost for iOS simulator / localhost dev
  return 'localhost';
}

const HOST = detectHost();
const DEFAULT_PORT = 3001;
const baseURL = "http://10.89.12.96:3000";

const api = axios.create({
  baseURL,
  timeout: 10000,
});

// allow runtime override
export function setApiBaseUrl(url) {
  api.defaults.baseURL = url;
}

export default api;
