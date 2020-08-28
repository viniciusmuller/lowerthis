// Wait page to fully load before start;
document.addEventListener("DOMContentLoaded", () => {

    // Taking elements and values;
    const userVolumeInput = document.querySelector("#ext-volume-slider");
    const github_url = document.querySelector('a');
    userVolumeInput.value = localStorage.getItem('sliderValue');

    // Adding GitHub profile link on popup;
    github_url.addEventListener("click", () => {
        let win = window.open("https://github.com/arcticlimer", "_blank");
        win.focus();
    })

    let lastUserVolume;
    // Checking if the current volume is different from the last
    // user volume before save it into storage to save API calls.
    setInterval( () => {
        let userVolume = userVolumeInput.value;
        // If the volume is different from the last check, then save it.
        if (userVolume != lastUserVolume){
            chrome.storage.sync.set({"userVolume": userVolume});
        }
        // Current volume turns into the last for the next iteration;
        lastUserVolume = userVolume;
        // Saving the slider value locally to save API calls;
        window.localStorage.setItem('sliderValue', userVolume);
    }, 100);
});
