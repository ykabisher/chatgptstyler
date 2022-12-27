
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(["chatStyle"]).then((result) => {
        console.log('result',result)
        // matrix style is available if its null or "matrix"
        if (!result || result.chatStyle !== "none") {
            document.getElementById("matrix").checked = "checked";
            document.getElementById("none").checked = null;
        } else {
            document.getElementById("none").checked = "checked";
            document.getElementById("matrix").checked = null;
        } 

        document.getElementById('matrix').addEventListener('change', function() {
            setChatStyle('matrix');
        });
        document.getElementById('none').addEventListener('change', function() {
            setChatStyle('none');
        });
       
    });


  
});

const setChatStyle = (newStyle) => {
    chrome.storage.sync.set({ chatStyle: newStyle }).then(() => {
        console.log("Value is set to " + newStyle);
    });
}
