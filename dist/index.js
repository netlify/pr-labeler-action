"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
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
            // eslint-disable-next-line @typescript-eslint/camelcase
            issue_number: prNumber,
            labels: [label],
        });
    }
    catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
}
main();
