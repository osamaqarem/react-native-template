const fs = require("fs")

const contents = () => {
  const data = fs.readFileSync(".env", { encoding: "ASCII" })

  const lines = data.split("\n")

  let filtered = []

  for (const line of lines) {
    if (line.includes("=")) {
      if (line.includes("#")) {
        filtered.push(line.split("#")[1].trim())
      } else {
        filtered.push(line.trim())
      }
    }
  }

  return filtered
}

const generate = () => {
  const lines = contents()
  let envVariableNamesArray = []
  let envVariableValuesArray = []

  for (const line of lines) {
    const pair = line.split("=")
    envVariableNamesArray.push(pair[0])
    envVariableValuesArray.push(pair[1])
  }

  const envVariableNamesArraySet = [...new Set(envVariableNamesArray)]

  let table = []
  let envVariableNamesArrayClone = [...envVariableNamesArray]

  envVariableNamesArraySet.forEach((name, currentNameIndex) => {
    // insert name into table
    table[currentNameIndex] = [name, []]

    let foundIndex = -10 // anything besides -1
    while (foundIndex !== -1) {
      foundIndex = envVariableNamesArrayClone.indexOf(name)

      if (foundIndex === -1) break
      // change the value so we dont find it again – keep it in array to retain correct mapping
      envVariableNamesArrayClone[foundIndex] = null

      const valueToInsert = envVariableValuesArray[foundIndex]

      // insert value for name into table
      table[currentNameIndex][1] = [
        ...table[currentNameIndex][1],
        valueToInsert
      ]
    }
  })

  //  Example table shape: [ [ name, ["possible_value_1", "possible_value_2" ] ] ]
  // [
  //   [ 'BUILD_VARIANT', [ 'DEBUG', 'RELEASE' ] ],
  //   [ 'MOCK_API', [ 'TRUE' ] ],
  //   [ 'EXAMPLE_API_BASE_URL', [ '"https://httpstat.us/"' ] ]
  // ]

  const stringArrayMap = table.map(nameValueArray => {
    const name = nameValueArray[0]
    const valuesArray = nameValueArray[1]

    let string = `${name}: `

    valuesArray.forEach((value, index) => {
      if (index === 0) {
        string = string.concat(`"${value}"`)
      } else {
        string = string.concat(` | "${value}"`)
      }
    })

    return string
  })

  const string = `declare module "react-native-config" {
    interface Config {
      ${stringArrayMap.join("\n      ")}
    }

    const config: Config

    export default config
  }`

  fs.writeFileSync("env.d.ts", string, "utf8")
}

generate()
