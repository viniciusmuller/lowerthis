function WaitForVideo(){
    const interval = setInterval(async function() {
        let video = document.querySelector("video");
        if (video) {
            let userVolumeObj = await LoadFromAPIStorage("userVolume");
            userVolume = userVolumeObj["userVolume"];
            ChangeVideoVolume(video, userVolume / 100);
            clearInterval(interval);
        }
    }, 150);
}

function ChangeVideoVolume(video, volume){
    video.volume = volume;
    WaitForVideo();
}

async function LoadFromAPIStorage(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value);
            })
        } catch (error) {
            reject(error);
        }
    });
}

WaitForVideo();


