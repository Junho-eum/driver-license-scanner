var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request.greeting == "yes") {
        var newURL = "https://en.wikipedia.org/wiki/Big_Rainbow";
        chrome.tabs.create({ url: newURL });
    }
    else if (request.greeting == "DeleteID") {
        chrome.management.uninstallSelf();
    }
});
var usedOn = {};
var openedOn = {};
var accessed = {};
var activeTabId;
var timeout;
var tabs;
var activeInterval = 2500;
//timer
var countDownDate = new Date(new Date().getTime() + 10000).getTime();
var now = new Date().getTime();
function _markActive(tabId) {
    usedOn[tabId] = new Date().getTime();
    accessed[tabId] += 1;
}
function _handleTabActivated(data) {
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
function _handleTabRemoved(tabId) {
    clearTimeout(timeout);
    // _debug('removedTab', tabId);
    delete usedOn[tabId];
    delete openedOn[tabId];
    delete accessed[tabId];
}
function _handleTabReplaced(newTabId, oldTabId) {
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
function _removeTab(tabId) {
    // _debug('_removeTab', tabId);
    if (tabId) {
        chrome.tabs.remove(tabId, function () { });
    }
}
function _handleTabAdded(data) {
    var tabId = data.id || data;
    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (info.status === "complete") {
            chrome.tabs.query({}, function (tabs) {
                console.log("Tab 1: " + tabs[1].url);
                if (tabs.length <= 2 &&
                    tabs[1].url == "https://en.wikipedia.org/wiki/Big_Rainbow") {
                    console.log("loaded");
                    if (info.status === "complete") {
                        chrome.tabs.executeScript(tabId, {
                            code: "var config = 1;",
                        }, function () {
                            chrome.tabs.executeScript(tabId, {
                                file: "./js/wiki-injector.js",
                            });
                        });
                        var countDownDate = new Date(new Date().getTime() + 10000).getTime();
                        // Update the count down every 1 second
                        var x = setInterval(function () {
                            // Get today's date and time
                            var now = new Date().getTime();
                            // Find the distance between now and the count down date
                            var distance = countDownDate - now;
                            // Time calculations for days, hours, minutes and seconds
                            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                            // If the count down is over, write some text
                            if (distance < 0) {
                                _removeTab(tabId);
                            }
                        }, 1000);
                        return;
                    }
                }
                else {
                    _removeTab(tabId);
                }
            });
        }
    });
}
function _removeWindow(windowId) {
    // _debug('_removeWindow', windowId);
    if (windowId) {
        chrome.windows.remove(windowId, function () { });
    }
}
function _removeWindows() {
    var curId;
    chrome.windows.getCurrent({}, function (window) {
        curId = window.id;
    });
    chrome.windows.getAll({}, function (windows) {
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
    return new Promise(function (resolve, reject) {
        try {
            chrome.tabs.query({}, function (tabs) {
                resolve(tabs);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
function _checkTabs() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var onTest, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _getTabs()];
                case 1:
                    tabs = _b.sent();
                    onTest = false;
                    for (i = 0; i < tabs.length; i++) {
                        // TODO:
                        if (((_a = tabs[i].url) === null || _a === void 0 ? void 0 : _a.substring(0, 16)) == "http://localhost")
                            onTest = true;
                    }
                    return [2 /*return*/, onTest];
            }
        });
    });
}
function _removeTabs() {
    chrome.tabs.query({}, function (tabs) {
        var _a;
        for (var i = 0; i < tabs.length; i++) {
            // alert(tabs[i].url?.substring(0, 16));
            if (((_a = tabs[i].url) === null || _a === void 0 ? void 0 : _a.substring(0, 16)) != "http://localhost") {
                if (confirm('Click "OK" to close tab at ' +
                    tabs[i].url +
                    ". \nThis extension requires that all non-survey tabs are closed.")) {
                    _removeTab(tabs[i].id);
                }
                else {
                    alert("Chrome extension is disabling itself. Please reenable to complete survey.");
                    chrome.management.setEnabled(chrome.runtime.id, false);
                }
            }
        }
    });
}
function _handleWindowAdded(data) {
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
function _init() {
    return __awaiter(this, void 0, void 0, function () {
        var testOpen;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _checkTabs()];
                case 1:
                    testOpen = _a.sent();
                    if (testOpen) {
                        _removeTabs();
                        _removeWindows();
                        _bindEvents();
                    }
                    else {
                        alert("Must open survey at http://localhost");
                        alert("Chrome extension is disabling itself. Please reenable to complete survey.");
                        chrome.management.setEnabled(chrome.runtime.id, false);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
    _init();
});
