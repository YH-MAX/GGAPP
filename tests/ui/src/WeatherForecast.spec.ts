import { By2 } from 'selenium-appium'
import TestEnvironment from '../TestEnvironment'

beforeAll(() => {
	return TestEnvironment.setup();
});

afterAll(() => {
	return TestEnvironment.teardown();
});

describe('Weather Forecast Test', () => {
	test('Temperature', async () => {
		// const webdriver = await new Builder()
		// 	.usingServer(serverurl)
		// 	.withCapabilities(capabilities)
		// 	.build();
		const element = By2.nativeId("temperature");
		expect(await element.getText()).toContain("Temperature:");
	})
});