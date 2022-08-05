# CSES Test Downloader

![preview](cses-test-downloader.png)

This Chrome (sorry Firefox users) extension fetches test cases from your result
page and download them. Currently supports custom naming and Themis (the official
judge program for the Vietnamese Olympiad in Informatics) test structure.

I don't intend to create this extension in the first place.
[@winprn](https://github.com/winprn) and
[@deptrai2k7](https://github.com/deptrai2k7) told me to make one, so here it is.
This is also my first attempt at creating a browser extension, please bear with
me if it sucks.

# Dependencies

- [JSZip](https://github.com/Stuk/jszip) and [JSZipUtils](https://github.com/Stuk/jszip-utils)
- [FileSaver](https://github.com/eligrey/FileSaver.js)

# Installation

- Clone this repository (or download as zip then extract)
- Go to `chrome://extensions` and enable Developer mode
- Select `Load unpacked` then select the directory

# Usage

- Click on the extension
- Enter the desired task name (optional, the default name is the task's ID)
- Click `download` and wait
