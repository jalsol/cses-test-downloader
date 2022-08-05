chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "download start") {
    sendResponse("received download start");
    downloadTests(request.taskName);
  }
});

function getTestLinks() {
  let allAnchors = document.querySelectorAll('a[class="view"');
  let tests = [];

  for (let i = 0; i < allAnchors.length; i += 3) {
    tests.push({
      inputRef: allAnchors[i].href,
      outputRef: allAnchors[i + 1].href,
    });
  }

  return tests;
}

function getTaskId() {
  let link = document.querySelectorAll('a[class="current"')[0].href;
  return link.split("/").pop();
}

function urlToPromise(url) {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function downloadTests(taskName) {
  const zip = new JSZip();
  const tests = getTestLinks();

  if (!taskName) {
    taskName = getTaskId();
  }

  console.log("task is", taskName);

  tests.forEach((test, i) => {
    let formattedId = (i + 1).toString().padStart(2, "0");

    zip.file(
      `${taskName}/Test${formattedId}/${taskName}.inp`,
      urlToPromise(test.inputRef)
    );

    zip.file(
      `${taskName}/Test${formattedId}/${taskName}.out`,
      urlToPromise(test.outputRef)
    );
  });

  console.log("test created");

  zip
    .generateAsync({
      type: "blob",
      compression: "DEFLATE",
      streamFiles: true,
      compressionOptions: {
        level: 6,
      },
    })
    .then(function callback(blob) {
      saveAs(blob, `${taskName}.zip`);
      console.log("test downloaded");
    });
}
