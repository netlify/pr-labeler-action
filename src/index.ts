import * as core from '@actions/core';
import * as github from '@actions/github';

async function main() {
  try {
    const token = core.getInput('token', { required: true });
    const label = core.getInput('label', { required: true });

    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
      console.log('Could not get pull request from context, exiting');
      return;
    }
    const prNumber = pullRequest.number;
    const client = github.getOctokit(token);

    await client.rest.issues.addLabels({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      labels: [label],
    });
  } catch (error) {
    const err = error as Error;
    core.error(err);
    core.setFailed(err.message);
  }
}

main();
