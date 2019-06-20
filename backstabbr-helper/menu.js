Array.from(document.getElementsByClassName("pretty")).forEach(elem => {
  elem.addEventListener("click", event => {
    browser.storage.local.set({[event.target.id]: event.target.checked})

    browser.tabs.query({url: "*://*.backstabbr.com/*"}, tabs => {
      console.log(tabs)
      Array.from(tabs).forEach(tab => {
        browser.tabs.sendMessage(tab.id, {event: event.target.id, state: event.target.checked})
      })
    })

    // browser.runtime.sendMessage({
    //   "type": "STATE_CHANGE",
    //   "message": {
    //     "from": event.target.id,
    //     "value": event.target.checked
    //   }
    // })
  })
});


browser.storage.local.get("privateMode").then(result => {
    document.getElementById("privateMode").checked = result.privateMode
})
browser.storage.local.get("hideTooltip").then(result => {
    document.getElementById("hideTooltip").checked = result.hideTooltip
})