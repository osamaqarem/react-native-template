// Generate possible env variable types from all .env files.
// Requirement: all environment files must have the same variables.

// eslint-disable-next-line
const fs = require("fs")

const contents = () => {
  const env = fs.readFileSync(".env", { encoding: "ASCII" })
  const envStaging = fs.readFileSync(".env.staging", { encoding: "ASCII" })
  const envProd = fs.readFileSync(".env.prod", { encoding: "ASCII" })

  const envLines = env.split("\n")
  const envStagingLines = envStaging.split("\n")
  const envProdLines = envProd.split("\n")

  // eslint-disable-next-line
  let filteredEnv = []
  // eslint-disable-next-line
  let filteredEnvStaging = []
  // eslint-disable-next-line
  let filteredEnvProd = []

  // Assumption: all files have the same number of lines
  for (let index = 0; index < envLines.length; index++) {
    const envLine = envLines[index]
    const envStagingLine = envStagingLines[index]
    const envProdLine = envProdLines[index]

    if (envLine.includes("=")) {
      if (envLine.includes("#")) {
        filteredEnv.push(envLine.split("#")[1].trim())
      } else {
        filteredEnv.push(envLine.trim())
      }
    }

    if (envStagingLine.includes("=")) {
      if (envStagingLine.includes("#")) {
        filteredEnvStaging.push(envStagingLine.split("#")[1].trim())
      } else {
        filteredEnvStaging.push(envStagingLine.trim())
      }
    }

    if (envProdLine.includes("=")) {
      if (envProdLine.includes("#")) {
        filteredEnvProd.push(envProdLine.split("#")[1].trim())
      } else {
        filteredEnvProd.push(envProdLine.trim())
      }
    }
  }

  return [filteredEnv, filteredEnvProd, filteredEnvStaging]
}

const generate = () => {
  const [filteredEnv, filteredEnvProd, filteredEnvStaging] = contents()
  // eslint-disable-next-line
  let envVariableNamesArray = []
  // eslint-disable-next-line
  let envVariableValuesArray = []

  for (let i = 0; i < filteredEnv.length; i++) {
    // Assumption: the files we read are not just comments
    const envPair = filteredEnv[i].split("=")
    const envStagingValue = filteredEnvStaging[i].split("=")[1]
    const envProdValue = filteredEnvProd[i].split("=")[1]

    envVariableNamesArray.push(envPair[0])

    envVariableValuesArray.push(envPair[1], envStagingValue, envProdValue)
  }

  // Assumption: for every name/key there are 3 values (env, env.staging, env.prod)
  // eslint-disable-next-line
  let table = []
  let valuesCursor = 0

  for (let i = 0; i < envVariableNamesArray.length; i++) {
    table[i] = [envVariableNamesArray[i], []]

    const totalPushCount = 3
    let current = 0
    while (current !== totalPushCount) {
      const valueToPush = envVariableValuesArray[valuesCursor]

      if (!table[i][1].includes(valueToPush)) {
        table[i][1].push(valueToPush)
      }
      valuesCursor++
      current++
    }
  }

  //  table desired shape:
  // [
  //   ['MOCK_API', ['YES', 'NO']],
  //   ['EXAMPLE_API_BASE_URL', ['"https://httpstat.us/"']]
  // ]

  const stringArrayMap = table.map((nameValueArray) => {
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
  interface Env {
    ${stringArrayMap.join("\n    ")}
  }

  const Config: Env

  export default Config
}`

  fs.writeFileSync("src\\common\\types\\env.d.ts", string, "utf8")
}

generate()
