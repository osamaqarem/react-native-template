import { Server } from "miragejs"
import BuildConfig from "react-native-config"
import { RepoReadme } from "../github/models"
import { githubService } from "../github/githubService"

/**
 * Use mirage to mock APIs.
 */
export const makeMirage = () =>
  new Server({
    urlPrefix: BuildConfig.GITHUB_API_BASE_URL,
    routes: function () {
      // Logging
      ; (this.pretender.handledRequest = function (verb, path, request) {
        console.log(`${verb}: ${path}`, request)
      })

      this.get(
        githubService.paths.getRepoReadme(),
        (): RepoReadme => mockResponse
      )
    },
  })


const mockResponse = {
  "name": "README.md",
  "path": "README.md",
  "sha": "4ce7575b978282dbde768bd711e9e4166b244c7e",
  "size": 3423,
  "url": "https://api.github.com/repos/osamaq/react-native-template/contents/README.md?ref=master",
  "html_url": "https://github.com/osamaq/react-native-template/blob/master/README.md",
  "git_url": "https://api.github.com/repos/osamaq/react-native-template/git/blobs/4ce7575b978282dbde768bd711e9e4166b244c7e",
  "download_url": "https://raw.githubusercontent.com/osamaq/react-native-template/master/README.md",
  "type": "file",
  "content": "TW9jayByZXNwb25zZS4gQ2hlY2sgbWlyYWdlLnRzIHRvIGVkaXQgdGhpcyE=",
  "encoding": "base64",
  "_links": {
    "self": "https://api.github.com/repos/osamaq/react-native-template/contents/README.md?ref=master",
    "git": "https://api.github.com/repos/osamaq/react-native-template/git/blobs/4ce7575b978282dbde768bd711e9e4166b244c7e",
    "html": "https://github.com/osamaq/react-native-template/blob/master/README.md"
  }
}
