function countTabs(windowId) {
	// fixme: all tabs has the same count where the last tab action occurred
	chrome.tabs.query({ windowId }, (tabs) => {
		const tabCount = tabs.length;
		console.log(tabCount);
		chrome.browserAction.setTitle({
			title: `Yout have ${tabCount} tabs.`,
		});
		chrome.browserAction.setBadgeText({
			text: `${tabCount}`,
		});
	});
}

chrome.tabs.onCreated.addListener((tab) => {
	const { windowId } = tab;
	countTabs(windowId);
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	const { windowId, isWindowClosing } = removeInfo;
	!isWindowClosing && countTabs(windowId);
});

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
	const { newWindowId } = attachInfo;
	countTabs(newWindowId);
});

chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
	const { oldWindowId } = detachInfo;
	countTabs(oldWindowId);
});

chrome.windows.onCreated.addListener((window) => {
	console.group(`window created`);
	console.dir(window);
	console.log(window.id);
	console.groupEnd();
});

chrome.windows.onRemoved.addListener((windowId) => {
	console.group(`winodow removed`);
	console.log(windowId);
	console.groupEnd();
});

chrome.windows.onFocusChanged.addListener((windowId) => {
	console.group(`window focus changed`);
	console.log(windowId);
	console.groupEnd();
	windowId > 0 && chrome.windows.get(windowId, { populate: true }, (window) => {
		console.log(`window for `, windowId);
		console.dir(window);
	});
});

countTabs();
