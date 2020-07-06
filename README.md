# Delete GitHub Issues Script

This is a quick script to delete GitHub issues. It's [open source](LICENSE).

## Why would you want to delete a repository's issues?

Imagine you have a longstanding private repository that you want to open source. There are like a thousand issues... including stack traces and such. In order to open source the repository you have to delete all the issues. The author of this script had such a problem and imagines there are others in a similar jam... stuck between Octocat and Charybdis or something like that.

## Can't you just delete them through the GitHub web UI?

You would think you could do that... but you can only navigate to the issue page and delete one issue at a time. For some reason GitHub doesn't seem to want to make it easy to delete issues. Also, at the time of this writing (July 5th 2020), deleting issues was only available through the GraphQL API and not through the REST API.

Instead of providing a way to lock issues from being deleted by default they just make their APIs hard to use to increase the cost of deleting issues? I dunno why, but that's how it works.

Encountering this situation you might then look for a browser extension and not find any that address the problem. If you have hundreds of issues to delete you might think to yourself "Huh. Is there a script to do that for me?"

# Usage

This is a node command line script using yarn as package management.

* Clone this repo
* `cd` into the directory
* `yarn install`
* [Create a GitHub Personal Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with access rights to the repository for your profile at https://github.com/settings/tokens
* Create a `.env` file with `GITHUB_PERSONAL_ACCESS_TOKEN=your access token`
* Set the `numberOfIssuesToDelete` in the `delete-issues.js` file (default is 100)
* run `yarn delete-issues` to delete some issues

# Troubleshooting

When you are deleting several hundred issues you might get a cool down warning from GitHub saying `RequestError [HttpError]: You have triggered an abuse detection mechanism. Please wait a few minutes before you try again.` 
I suggest waiting a few minutes and then try again.

You might get an an access error for your personal access token. You may need to add more permissions for your Personal Access Token on https://github.com/settings/tokens
