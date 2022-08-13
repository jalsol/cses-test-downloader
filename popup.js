function popup() {
  let taskName = document.getElementById("input-task-name").value;
  let testFormat = document.getElementById("test-format").value;

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        message: "download start",
        taskName: taskName,
        testFormat: testFormat,
      },
      (response) => {
        if (response === "received download start") {
          alert(
            `download for task "${taskName}" (${testFormat} format) has started, please wait...`
          );
        } else if (response == "test format not allowed") {
          alert("test format not allowed, aborted.");
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button").addEventListener("click", popup);
});
