chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.greeting == "yes") {
    var newURL = "https://en.wikipedia.org/wiki/Big_Rainbow";
    chrome.tabs.create({ url: newURL });
  } else if (request.greeting == "DeleteID") {
    chrome.management.uninstallSelf();
  }
});

var usedOn: any = {};
var openedOn: any = {};
var accessed: any = {};
var activeTabId;
var timeout: any;
var tabs: any;
var activeInterval = 2500;

//timer
var countDownDate = new Date(new Date().getTime() + 10000).getTime();
var now = new Date().getTime();

function _markActive(tabId: number) {
  usedOn[tabId] = new Date().getTime();
  accessed[tabId] += 1;
}

function _handleTabActivated(data: any) {
  var tabId = data.tabId;
  activeTabId = tabId;
  // _debug('activated', tabId);

  clearTimeout(timeout);

  // after 3 seconds mark this tab as active
  // this is so if you are quickly switching tabs
  // they are not considered active
  timeout = setTimeout(function () {
    _markActive(tabId);
  }, activeInterval);
}

function _handleTabRemoved(tabId: any) {
  clearTimeout(timeout);

  // _debug('removedTab', tabId);
  delete usedOn[tabId];
  delete openedOn[tabId];
  delete accessed[tabId];
}

function _handleTabReplaced(newTabId: any, oldTabId: any) {
  if (usedOn[oldTabId]) {
    usedOn[newTabId] = usedOn[oldTabId];
  }

  if (openedOn[oldTabId]) {
    openedOn[newTabId] = openedOn[oldTabId];
  }

  if (accessed[oldTabId]) {
    accessed[newTabId] = accessed[oldTabId];
  }

  delete usedOn[oldTabId];
  delete openedOn[oldTabId];
  delete accessed[oldTabId];
}

function _removeTab(tabId: any) {
  // _debug('_removeTab', tabId);
  if (tabId) {
    chrome.tabs.remove(tabId, function () {});
  }
}

function _handleTabAdded(data: any) {
  var tabId = data.id || data;
  chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === "complete") {
      chrome.tabs.query({}, function (tabs) {
        console.log("Tab 1: " + tabs[1].url);
        if (
          tabs.length <= 2 &&
          tabs[1].url == "https://en.wikipedia.org/wiki/Big_Rainbow"
        ) {
          console.log("loaded");

          if (info.status === "complete") {
            chrome.tabs.executeScript(
              tabId,
              {
                code: "var config = 1;",
              },
              function () {
                chrome.tabs.executeScript(tabId, {
                  file: "./js/wiki-injector.js",
                });
              }
            );

            var countDownDate = new Date(
              new Date().getTime() + 10000
            ).getTime();

            // Update the count down every 1 second
            var x = setInterval(function () {
              // Get today's date and time
              var now = new Date().getTime();

              // Find the distance between now and the count down date
              var distance = countDownDate - now;

              // Time calculations for days, hours, minutes and seconds
              var minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
              );
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // If the count down is over, write some text
              if (distance < 0) {
                _removeTab(tabId);
              }
            }, 1000);
            return;
          }
        } else {
          _removeTab(tabId);
        }
      });
    }
  });
}

function _removeWindow(windowId: any) {
  // _debug('_removeWindow', windowId);
  if (windowId) {
    chrome.windows.remove(windowId, function () {});
  }
}

function _removeWindows() {
  var curId;
  chrome.windows.getCurrent({}, function (window: any) {
    curId = window.id;
  });
  chrome.windows.getAll({}, function (windows: any) {
    for (var i = 0; i < windows.length; i++) {
      if (windows[i].id != curId) {
        // if(confirm("Click \"OK\" to close external Chrome window.")){
        chrome.windows.remove(windows[i].id);
        // }else{
        // }
      }
    }
  });
}

function _getTabs() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({}, function (tabs) {
        resolve(tabs);
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function _checkTabs() {
  tabs = await _getTabs();
  var onTest = false;
  for (var i = 0; i < tabs.length; i++) {
    // TODO:
    if (tabs[i].url?.substring(0, 16) == "http://localhost") onTest = true;
  }
  return onTest;
}

function _removeTabs() {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      // alert(tabs[i].url?.substring(0, 16));
      if (tabs[i].url?.substring(0, 16) != "http://localhost") {
        if (
          confirm(
            'Click "OK" to close tab at ' +
              tabs[i].url +
              ". \nThis extension requires that all non-survey tabs are closed."
          )
        ) {
          _removeTab(tabs[i].id);
        } else {
          alert(
            "Chrome extension is disabling itself. Please reenable to complete survey."
          );
          chrome.management.setEnabled(chrome.runtime.id, false);
        }
      }
    }
  });
}

function _handleWindowAdded(data: any) {
  var winId = data.id || data;
  // _debug('added', winId);
  _removeWindow(winId);
}

function _bindEvents() {
  chrome.tabs.onActivated.addListener(_handleTabActivated);
  chrome.tabs.onCreated.addListener(_handleTabAdded);
  chrome.tabs.onAttached.addListener(_handleTabAdded);
  chrome.tabs.onRemoved.addListener(_handleTabRemoved);
  chrome.tabs.onDetached.addListener(_handleTabRemoved);
  chrome.tabs.onReplaced.addListener(_handleTabReplaced);
  chrome.windows.onCreated.addListener(_handleWindowAdded);
}

async function _init() {
  var testOpen = await _checkTabs();
  if (testOpen) {
    _removeTabs();
    _removeWindows();
    _bindEvents();
  } else {
    alert("Must open survey at http://localhost");
    alert(
      "Chrome extension is disabling itself. Please reenable to complete survey."
    );
    chrome.management.setEnabled(chrome.runtime.id, false);
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  _init();
});
