import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ItemListScreen from '../../src/screens/ItemListScreen';

jest.mock('../../src/services/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: [
    { id: 1, title: 'Item One', description: 'First item' },
    { id: 2, title: 'Item Two', description: 'Second item' }
  ] })),
}));

describe('ItemListScreen', () => {
  it('renders items from API', async () => {
    const { getByText } = render(<ItemListScreen navigation={{ navigate: () => {} }} />);

    await waitFor(() => expect(getByText('Item One')).toBeTruthy());
    expect(getByText('Item Two')).toBeTruthy();
  });
});
