if (typeof unitsByPlayer !== "undefined" & typeof territories !== "undefined") {
    document.dispatchEvent(new CustomEvent('injected', {
        detail: {
            unitsByPlayer: unitsByPlayer,
            territories: territories,
        }
    }));
} else {
    console.log("Not on a game screen")
}
