require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __importDefault(__nccwpck_require__(747));
function run() {
    const filePath = 'ProjectSettings/ProjectSettings.asset';
    const settingsFile = fs_1.default.readFileSync(filePath, 'utf8');
    const regexOne = /AndroidBundleVersionCode: (.)/g;
    const regexTwo = /buildNumber:\r\n    Standalone: (.)\r\n    iPhone: (.)\r\n    tvOS: (.)/gm;
    let buildNumberMatch = regexOne.exec(settingsFile);
    let regexTwoMatch = regexTwo.exec(settingsFile);
    console.log(`Reading File ${buildNumberMatch}`);
    console.log(`Settings File ${regexTwoMatch}`);
    if (!buildNumberMatch)
        return;
    if (!regexTwoMatch)
        return;
    let modifiedFile = settingsFile;
    let buildNumber = parseInt(buildNumberMatch[1]);
    buildNumber++;
    modifiedFile = modifiedFile.replace(buildNumberMatch[0], `AndroidBundleVersionCode: ${buildNumber}`);
    modifiedFile = modifiedFile.replace(regexTwoMatch[0], `buildNumber:\r\n    Standalone: ${buildNumber}\r\n    iPhone: ${buildNumber}\r\n    tvOS: ${buildNumber}`);
    fs_1.default.writeFileSync(filePath, modifiedFile);
    console.log(`Build number ${buildNumber}`);
    console.log(`Modified Settings ${modifiedFile}`);
}
run();


/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map