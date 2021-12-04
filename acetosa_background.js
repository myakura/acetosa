function countTabs() {
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		console.log(tabs.length);
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
