// ALERT: Despite this extension is not properly packed by Chrome,
// this content script may not run on the browser, if that happens,
// the best thing you can do is try to reload the extension files 
// and restart Chrome.

// Main background interval
setInterval(async () => {
    console.log('started');
    let url = window.location.href;
    // Check if the page is actually a instagram story;
    if (url.startsWith('https://www.instagram.com/stories')){
        let video = document.querySelector("video");
        // If there's a story running on the page;
        if (video) {
            let userVolume = (await LoadFromAPIStorage("userVolume"))["userVolume"];
            // Load the volume value from API and sets
            // it into the current video volume;
            video.volume = userVolume / 100;
        }
    }
}, 150);

// Receives a key parameter and get it from the google
// extension storage API.
async function LoadFromAPIStorage(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, value => {
                resolve(value);
            });
        } catch (error) {
            reject(error);
        }
    });
}
