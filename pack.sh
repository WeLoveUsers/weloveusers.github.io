#!/bin/sh

csso modules/wlu/wlu.css --output modules/wlu/wlu.min.css
uglifyjs modules/wlu/wlu.js --output modules/wlu/wlu.min.js
