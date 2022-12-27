

function makeItRain(timeDelayToStart = (10 * 1000)) {
    const characters = `日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789Z"'=:.+<>|_ç`;
    const length = 100;
    function makeLine() {
        if (!styleLink) return;
        const snippet = document.createElement('div');
        if (snippet && snippet.style) {
            snippet.className = 'rain-drop';
            let rnd = Math.round(Math.random() * 99);
            if (rnd > 20 && rnd < 80) return;
            snippet.style.left = `${rnd}%`;

            document.querySelector('div.items-center').appendChild(snippet);
            let counter = 0;
            var i = setInterval(() => {
                snippet.innerHTML += characters[Math.round(Math.random() * (characters.length - 1))];
                counter++;
                if (counter > (length * .90)) {
                    snippet.classList.add('fade-out');
                }
                if (counter > length) {
                    clearInterval(i);
                    snippet.remove();
                }
            }, 100);
        }

    }

    function startRain() {
        makeLine();
        makeLine();
        makeLine();
        makeLine();
        makeLine();

        setInterval(() => {
            makeLine();
        }, 250);

    }

    setTimeout(startRain, timeDelayToStart + 100);
}


let styleLink = null;

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === "chatStyle") {
        changeStyle(newValue)
      }
    }
  });

chrome.storage.sync.get(["chatStyle"]).then((result) => {
    changeStyle(result.chatStyle)
});

const changeStyle = (newStyle) => {
    if (newStyle === "none") {
        document.getElementsByTagName("head")[0].removeChild(styleLink);
        styleLink = null;
        const collection = document.querySelector('div.items-center').getElementsByClassName("rain-drop");
        collection.forEach(element => {
            element.style.display = "none"
        });
    
    } else if (!styleLink && (!newStyle || newStyle === "matrix" || typeof newStyle === 'object')) {
        styleLink = document.createElement("link");
        styleLink.href = chrome.runtime.getURL("matrix.css");
        styleLink.type = "text/css";
        styleLink.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(styleLink);

        makeItRain(0, 10 * 1000);
    }
}
