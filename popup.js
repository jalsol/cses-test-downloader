function popup() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "download start" },
      (response) => {
        if (response === "received download start") {
          alert("download has started, please wait...");
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button").addEventListener("click", popup);
});
