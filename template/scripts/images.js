// Generate PNG Image imports using node

const fs = require("fs")

const imageFileNames = () => {
  const array = fs
    .readdirSync("src/common/assets/images")
    .filter(file => file.endsWith(".png"))
    .map(file => file.replace(".png", ""))

  return Array.from(new Set(array))
}

const generate = () => {
  let properties = imageFileNames()
    .map(name => `${name}: require('./${name}.png')`)
    .join(",\n  ")

  const string = `export default {
  ${properties}
}
`

  fs.writeFileSync("src/common/assets/images/index.js", string, "utf8")
}

generate()
