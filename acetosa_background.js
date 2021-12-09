function getTabs(windowId) {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ windowId }, (tabs) => {
			if (chrome.runtime.lastError) {
				reject(new Error(chrome.runtime.lastError));
			}
			resolve(tabs);
		});
	});
}

function updateCountView(tabCount) {
	// console.log(`tabCount: ${tabCount}`);
	chrome.browserAction.setTitle({
		title: `You have ${tabCount} tabs.`,
	});
	chrome.browserAction.setBadgeText({ text: `${tabCount}` });
	chrome.browserAction.setBadgeBackgroundColor({ color: `#36f` });
}

async function countTabs(windowId) {
	const tabs = await getTabs(windowId);
	updateCountView(tabs.length);
}

chrome.tabs.onCreated.addListener(async (tab) => {
	const { windowId } = tab;
	await countTabs(windowId);
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
	const { windowId, isWindowClosing } = removeInfo;
	!isWindowClosing && (await countTabs(windowId));
});

chrome.tabs.onAttached.addListener(async (tabId, attachInfo) => {
	const { newWindowId } = attachInfo;
	await countTabs(newWindowId);
});

chrome.tabs.onDetached.addListener(async (tabId, detachInfo) => {
	const { oldWindowId } = detachInfo;
	await countTabs(oldWindowId);
});

// chrome.windows.onCreated.addListener((window) => {
// 	console.group(`window created`);
// 	console.dir(window);
// 	console.log(window.id);
// 	console.groupEnd();
// });

// chrome.windows.onRemoved.addListener((windowId) => {
// 	console.group(`winodow removed`);
// 	console.log(windowId);
// 	console.groupEnd();
// });

chrome.windows.onFocusChanged.addListener(async (windowId) => {
	// console.group(`window focus changed`);
	// console.log(windowId);
	// console.groupEnd();
	// windowId > 0 &&
	// 	chrome.windows.get(windowId, { populate: true }, (window) => {
	// 		console.log(`window for `, windowId);
	// 		console.dir(window);
	// 	});
	if (windowId > 0) {
		const tabs = await getTabs(windowId);
		console.log(tabs);
		updateCountView(tabs.length);
	}
});

countTabs();
