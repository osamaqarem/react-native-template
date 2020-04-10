// Generate PNG Image imports using node.
// TODO: better handling on different file names.

const fs = require("fs")

const imageFileNames = () => {
  const array = fs
    .readdirSync("src/common/assets/images")
    .filter((file) => file.endsWith(".png"))
    .map((file) => file.replace(".png", ""))

  return Array.from(new Set(array))
}

const generate = () => {
  const properties = imageFileNames()
    .map((name) => `${name}: require('./${name}.png')`)
    .join(",\n  ")

  const string = `export const images = {
  ${properties}
}
`

  fs.writeFileSync("src/common/assets/images/index.js", string, "utf8")
}

generate()
