import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

function TestConsumer() {
  const { user } = useAuth();
  return <Text testID="user">{user?.email ?? 'no-user'}</Text>;
}

describe('AuthContext', () => {
  it('provides default auth state', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(getByTestId('user').props.children).toBe('no-user');
  });
});
