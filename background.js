//that file determine actions which extension should make outside of the plugin window
//window object not exists in popup.js, plugin is outside the DOM 
//all external actions should be make by chrome api's

saveWordTranslation = (word) => {
    alert(word.selectionText)
};

chrome.contextMenus.create({
    title: "Save word translation",
    contexts:["selection"],
    onclick: saveWordTranslation
});