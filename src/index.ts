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
    const client = new github.GitHub(token);

    await client.issues.addLabels({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      labels: [label],
    });
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

main();
