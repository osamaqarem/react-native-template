// Generate possible env variable types from all .env files.

const fs = require("fs")

const contents = () => {
  const env = fs.readFileSync(".env", { encoding: "ASCII" })
  const envStaging = fs.readFileSync(".env.staging", { encoding: "ASCII" })
  const envProd = fs.readFileSync(".env.prod", { encoding: "ASCII" })

  const envLines = env.split("\n")
  const envStagingLines = envStaging.split("\n")
  const envProdLines = envProd.split("\n")

  let filteredEnv = []

  for (const line of envLines) {
    if (line.includes("=")) {
      if (line.includes("#")) {
        filteredEnv.push(line.split("#")[1].trim())
      } else {
        filteredEnv.push(line.trim())
      }
    }
  }

  let filteredEnvStaging = []

  for (const line of envStagingLines) {
    if (line.includes("=")) {
      if (line.includes("#")) {
        filteredEnvStaging.push(line.split("#")[1].trim())
      } else {
        filteredEnvStaging.push(line.trim())
      }
    }
  }

  let filteredEnvProd = []

  for (const line of envProdLines) {
    if (line.includes("=")) {
      if (line.includes("#")) {
        filteredEnvProd.push(line.split("#")[1].trim())
      } else {
        filteredEnvProd.push(line.trim())
      }
    }
  }

  return [filteredEnv, filteredEnvProd, filteredEnvStaging]
}

const generate = () => {
  const [filteredEnv, filteredEnvProd, filteredEnvStaging] = contents()
  let envVariableNamesArray = []
  let envVariableValuesArray = []

  for (let i = 0; i < filteredEnv.length; i++) {
    const envPair = filteredEnv[i].split("=")
    const envStagingValue = filteredEnvStaging[i].split("=")[1]
    const envProdValue = filteredEnvProd[i].split("=")[1]

    envVariableNamesArray.push(envPair[0])

    envVariableValuesArray.push(envPair[1], envStagingValue, envProdValue)
  }

  // Assumption: for every name/key there are 3 values (env, env.staging, env.prod)
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

  //  Example table shape:
  // [
  //   ['MOCK_API', ['YES', 'NO']],
  //   ['EXAMPLE_API_BASE_URL', ['"https://httpstat.us/"']]
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
      interface Env {
        ${stringArrayMap.join("\n      ")}
      }

      const Config: Env

      export default Config
  }`

  fs.writeFileSync("env.d.ts", string, "utf8")
}

generate()
