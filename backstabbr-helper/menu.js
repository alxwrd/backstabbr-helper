const browser = window.browser || window.chrome;

Array.from(document.getElementsByClassName("pretty")).forEach(elem => {
  elem.addEventListener("click", event => {
    chrome.storage.local.set({[event.target.id]: event.target.checked})

    browser.tabs.query({url: "*://*.backstabbr.com/*"}, tabs => {
      Array.from(tabs).forEach(tab => {
        browser.tabs.sendMessage(tab.id, {event: event.target.id, state: event.target.checked})
      })
    })
  })
});


chrome.storage.local.get("privateMode", result => {
    document.getElementById("privateMode").checked = result.privateMode
})
chrome.storage.local.get("hideTooltip", result => {
    document.getElementById("hideTooltip").checked = result.hideTooltip
})

document.getElementById("screenshot").addEventListener("click", (event) => {
    browser.tabs.query({url: "*://*.backstabbr.com/*"}, tabs => {
      Array.from(tabs).slice(0,1).forEach(tab => {
        if (chrome.tabs.highlight) {
          chrome.tabs.highlight({tabs: [0]})
        }
        browser.tabs.sendMessage(tab.id, {event: event.target.id})
      })
  }) 
})