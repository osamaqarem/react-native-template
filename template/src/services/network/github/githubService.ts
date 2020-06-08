import { create } from 'apisauce'
import BuildConfig from "react-native-config"
import { RepoReadme } from './models'
import HttpException from '../../../common/exceptions/HttpException'

// API client instance
const client = create({
    baseURL: BuildConfig.GITHUB_API_BASE_URL,
    timeout: 30 * 1000,
    headers: {
        accept: 'application/vnd.github.v3+json'
    }
})

// Logging
__DEV__ && client.addMonitor(res => console.tron(res))

// By default, apisauce does not throw on failure.
// For SWR to work, the fetcher needs to throw on failure.
client.addResponseTransform(response => {
    if (!response.ok) {
        const error = new HttpException(response.status || 'unknown', response.problem, response.config?.url || 'unknown', response)

        __DEV__ && console.tron(error)

        throw error
    }
})

/**
 * API implementation
 */
const paths = {
    getRepoReadme: () => "/repos/osamaq/react-native-template/readme",
}

const api = {
    getRepoReadme: () => client.get<RepoReadme>(paths.getRepoReadme()),
}

export const githubService = {
    api,
    paths,
    client
}
