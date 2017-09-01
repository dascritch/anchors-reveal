chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.executeScript(tab.id, {file:'/data/anchors-reveal.js'}, handleExecuteScriptAndInsertCSSErrors);
});

//The following was modified from http://stackoverflow.com/a/40517692/3773011 Copied by the author of the post.
function handleExecuteScriptAndInsertCSSErrors(tabId){
    if(chrome.runtime.lastError){
        var message = chrome.runtime.lastError.message;
        var isFirefox = !!window.InstallTrigger;
        var extraMessage = 'on this URL.';
        if((!isFirefox && message.indexOf('Cannot access a chrome:') > -1) //Chrome
            || (isFirefox && message.indexOf('No window matching') > -1) //Firefox
        ){
            //The current tab is one into which we are not allowed to inject scripts.
            var messageText= 'This extension, ' + chrome.runtime.id
                             + ', does not work ' + extraMessage;
            console.log(messageText);
        } else {
            // Report the error
            if(isFirefox){
                //In Firefox, runtime.lastError is an Error Object including a stack trace.
                console.error(chrome.runtime.lastError);
            }else{
                console.error(message);
            }
        }
    }
}

