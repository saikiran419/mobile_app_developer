import '@testing-library/jest-native/extend-expect';

jest.useRealTimers();

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Silence YellowBox warnings during tests
global.console = {
  ...console,
  warn: (msg) => {
    if (typeof msg === 'string' && msg.includes('Setting a timer')) return;
    console.warn(msg);
  },
};
