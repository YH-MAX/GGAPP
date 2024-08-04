/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import axios from 'axios';

// Mock axios to suppress back-end API calls in this test
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Note: test renderer must be required after react-native.
import { render, waitFor } from '@testing-library/react-native';

describe('App', () => {
	const renderComponent = () => (render(<App />));

	test('Renders Correctly', async () => {
		renderComponent();
	});
});
