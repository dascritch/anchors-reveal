var script_to_call = {file:'/data/anchors-reveal.js'};
var menu_id = 'anchors-reveal';

chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.executeScript(tab.id, script_to_call, handleExecuteScriptAndInsertCSSErrors);
});

//The following was modified from http://stackoverflow.com/a/40517692/3773011 Copied by the author of the post.
function handleExecuteScriptAndInsertCSSErrors(tabId){
    if(chrome.runtime.lastError){
        var isFirefox = !!window.InstallTrigger;

        var message = chrome.runtime.lastError.message ? chrome.runtime.lastError : chrome.runtime.lastError.message;

        // REALLY UGLY
        if((!isFirefox && message.indexOf('Cannot access a chrome:') > -1) //Chrome
            || (isFirefox && message.indexOf('No window matching') > -1) //Firefox
        ){
            //The current tab is one into which we are not allowed to inject scripts.
            console.info('The anchors-reveal extention does not work on this URL.');
        } else {
            // Report the error
            console.error(message);
        }
    }
}

function oops(e) {
    console.error(e);
}

function add_contextual_menu(result) {

    if (result.menu) {
        browser.contextMenus.create({
          id: menu_id,
          title: browser.i18n.getMessage('buttonDescription')
        });

        browser.contextMenus.onClicked.addListener(function(info, tab) {
          if (info.menuItemId === menu_id) {
            browser.tabs.executeScript(script_to_call);
          }
        });
    }

}

var getting = browser.storage.local.get('menu');
getting.then(add_contextual_menu, oops);