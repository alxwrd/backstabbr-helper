
// Inserts the script 'inject.js' into the current document. Once it's loaded,
//  remove it. This makes it possible to enter the pages javascript scope to
//  access variables declared there.
var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
  s.parentNode.removeChild(s);
};

document.addEventListener('injected', function (e) {
  territories = e.detail.territories;
  unitsByPlayer = e.detail.unitsByPlayer;
  //colourTerritories();
});


let territories;
let unitsByPlayer;
function getArrows() {
  let paths = document.getElementsByTagName("path")
  let arrows = Array.from(paths).filter(
    elem => elem.getAttribute("style") == ""
    || elem.getAttribute("style") == "fill-opacity: 0.8;"
    || elem.hasAttribute("stroke-dasharray")
  )
  return arrows
}

document.addEventListener("keydown", event => {
  if (event.code == "Space") {
    let elem = document.getElementById("body-container");
    if (elem.style.filter) {
      elem.style.filter = "";
      elem.style["user-select"] = "";
    } else {
      elem.style.filter = "grayscale(100%) blur(5px)";
      elem.style["user-select"] = "none";
    } 
    event.preventDefault();
  }
});

browser.storage.local.get("privateMode").then(result => {
  togglePlayerDetails(result.privateMode)
})

browser.storage.local.get("hideTooltip").then(result => {
  console.log(result)
})

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.event === "privateMode") {
    togglePlayerDetails(message.state)
  }
})

function togglePlayerDetails(dontdisplay) {
  let arrows = getArrows()
  arrows.forEach(elem => {
    if (dontdisplay) {
      elem.style.display = "none";
    } else {
      elem.style.display = "";
    }
  })
}


// function colourTerritories() {
//   for (var territory in territories) {
//     if (territories.hasOwnProperty(territory)) {
//       let elem = document.getElementById(`ter_${territory}`)
//       elem.setAttribute("fill", playerColours[territories[territory]])
//     }
//   };

//   for (var country in unitsByPlayer) {
//     if (unitsByPlayer.hasOwnProperty(country)) {

//       for (let region in unitsByPlayer[country]) {
//         if (unitsByPlayer[country].hasOwnProperty(region)) {
//           // Ignore ocean regions
//           if (region !== region.toUpperCase()) {
//             let elem = document.getElementById(`ter_${region}`)
//             elem.setAttribute("fill", playerColours[country])
//           }
//         }
//       }
//     }
//   };
//   document.querySelectorAll("[id^='ter_']").forEach((elem) => {
//     elem.setAttribute("style", "fill-opacity: 0.3;")
//   });
// };


// const supplyCenters = {
//   "Ank": "circle[cx='482']",
//   "Ber": "circle[cx='281']",
//   "Bre": "circle[cx='106']",
//   "Bud": "circle[cx='326']",
//   "Con": "circle[cx='424']",
//   "Edi": "circle[cx='154']",
//   "Kie": "circle[cx='254']",
//   "Lon": "circle[cx='162']",
//   "Lvp": "circle[cx='144']",
//   "Mar": "circle[cy='417']",
//   "Mos": "circle[cx='481']",
//   "Mun": "circle[cx='258']",
//   "Nap": "circle[cx='278']",
//   "Par": "circle[cx='173']",
//   "Rom": "circle[cx='268']",
//   "Rum": "circle[cx='402']",
//   "Sev": "circle[cx='483']",
//   "Smy": "circle[cx='424']",
//   "Stp": "circle[cx='418']",
//   "Tri": "circle[cx='284']",
//   "Ven": "circle[cx='261']",
//   "Vie": "circle[cx='301']",
//   "War": "circle[cx='346']",
// }

// const playerColours = {
//   "Austria": "#cc0000",
//   "England": "#0000aa",
//   "France": "#9999ff",
//   "Germany": "#000000",
//   "Italy": "#00aa00",
//   "Russia": "#bb00bb",
//   "Turkey": "#bbbb00",
// }