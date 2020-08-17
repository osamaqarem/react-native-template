import { create, ApisauceInstance, ApiResponse } from 'apisauce'
import BuildConfig from "react-native-config"
import { RepoReadme } from './models'
import HttpException from '../../../common/exceptions/HttpException'

// Apisauce instance
const instance = create({
    baseURL: BuildConfig.GITHUB_API_BASE_URL,
    timeout: 30 * 1000,
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    }
})

type Args = Parameters<ApisauceInstance['get']>

/**
 * Wrapper around API instance.
 * By default, apisauce does not throw on failure.
 * 
 * In order for useSWR() to correctly return the error, 
 * the fetcher needs to throw on failure.
 */
const client = {
    /**
     * We're forwarding the types and arguments and then throwing on error.
     */
    ...instance,
    get: async <T>(...args: Args) => {
        const res = await instance.get(...args) as ApiResponse<T>
        return util.throwOnError<T>(res)
    }
    // override more methods as needed
}

// Logging
__DEV__ && client.addMonitor(console.log)



// API Paths
const paths = {
    getRepoReadme: () => "/repos/osamaq/react-native-template/readme",
}

// API implementation
const api = {
    getRepoReadme: () => client.get<RepoReadme>(paths.getRepoReadme()),
}

// API utilities
const util = {
    throwOnError: <T>(response: ApiResponse<T>) => {
        if (!response.ok) {
            const error = new HttpException(
                response.status || 'unknown',
                response.problem,
                response.config?.url || 'unknown',
                response)

            __DEV__ && console.log(error)

            throw error
        } else {
            // all good!
            return response.data!
        }
    }
}

export const githubService = {
    api,
    paths,
    client,
    util
}
