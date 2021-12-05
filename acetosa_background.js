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

countTabs();
