import { driver, windowsAppDriverCapabilities } from 'selenium-appium';
import * as path from 'path';

const dir = path.resolve(__dirname, '..\\..');
const appPath = dir.concat('\\frontend\\GGAppFrontend\\windows\\x64\\Release\\GGAppFrontend\\GGAppFrontend.exe')
const serverurl = 'http://127.0.0.1:4723';
const capabilities = {
	browserName: '',
	platformName: 'Windows',
	deviceName: 'WindowsPC',
	app: appPath
}

class TestEnvironment {
	setup() {
		jest.setTimeout(60000);
		// const capabilities = windowsAppDriverCapabilities(appPath);
		return driver.startWithCapabilities(capabilities, serverurl);
	}

	teardown() {
		return driver.quit();
	}
}

export default new TestEnvironment();