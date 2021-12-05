function countTabs() {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		const tabCount = tabs.length;
		console.log(tabCount);
		chrome.browserAction.setTitle({
			title: `Yout have ${tabCount} length`,
		});
		chrome.browserAction.setBadgeText({
			text: `${tabCount}`,
		})
	});
}

chrome.tabs.onCreated.addListener(() => {
	countTabs();
});

chrome.tabs.onRemoved.addListener(() => {
	countTabs();
});

chrome.tabs.onAttached.addListener(() => {
	countTabs();
});

chrome.tabs.onDetached.addListener(() => {
	countTabs();
});

countTabs();
