const puppeteer = require('puppeteer');

async function sleep(delay) {
	return new Promise(resolve => setTimeout(resolve, delay));
}

puppeteer.launch().then(async browser => {
	const page = await browser.newPage();
	const options = {
		
		'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
		'viewport': {
			'width': 1920,
			'height': 1080
		}
	};
	await page.emulate(options);
	await page.setExtraHTTPHeaders({'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'});
	await page.setRequestInterception(true);

	page.on('request', interceptedRequest => {
		if (interceptedRequest.url().endsWith('.m3u8')) {
			console.log(interceptedRequest.url());
		}
		interceptedRequest.continue();
	});

	await page.goto('');
	await sleep(1000);
	//await page.screenshot({path: 'test.png', fullPage: true});

	await browser.close();
});
