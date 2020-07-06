require('dotenv').config()
const { graphql } = require("@octokit/graphql")

const auth_token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
const numberOfIssuesToDelete = 100

async function deleteIssue(issueId) {
  await graphql(
    `
    mutation DeleteIssueInput {
        deleteIssue(input: {issueId:"${issueId}" }) {
            clientMutationId
        }
      }
    `,
    {
      headers: {
        authorization: `token ${auth_token}`,
      },
    }
  ).then(x => console.log(x))
  .catch(err => {
      console.log(err)
  })
}

graphql(
    `
      {
        repository(owner: "CoMakery", name: "comakery-app") {
          issues(last: ${numberOfIssuesToDelete}) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `,
    {
      headers: {
        authorization: `token ${auth_token}`,
      },
    }
  ).then((response) => {
      let edges = response.repository.issues.edges
      return edges.map(issue => issue.node.id)
}).then((issueIds) => {
  let deletions = issueIds.map(issueId => deleteIssue(issueId))
  console.log(`deleting ${deletions.length} issues` )
  Promise.all(deletions)
})
.catch(err => console.log(err))

