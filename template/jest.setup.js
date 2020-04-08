require("@testing-library/jest-native/extend-expect")

// jest.setup.js
global.self = global
global.window = {}
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
