document.addEventListener("DOMContentLoaded", function(){  // Wait page to fully load before start;

    const userVolumeInput = document.querySelector("#ext-volume-slider");
    const github_url = document.querySelector('a');
    userVolumeInput.value = localStorage.getItem('sliderValue');

    github_url.addEventListener("click", function(){
        let win = window.open("https://github.com/arcticlimer", "_blank");
        win.focus();
    })

    let lastUserVolume;
    const interval = setInterval(function() {
        let userVolume = userVolumeInput.value;
        if (userVolume != lastUserVolume){
            chrome.storage.sync.set({"userVolume": userVolume});
        }
        lastUserVolume = userVolume;
        window.localStorage.setItem('sliderValue', userVolume);
    }, 100);
});
