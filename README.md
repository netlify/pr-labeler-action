# pr-labeler-action

Example usage:

Create a `.github/workflows/labeler.yml` file with the content of:

```yaml
name: Label PR
on:
  pull_request:
    types: [opened, edited]

jobs:
  label-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: netlify/pr-labeler-action@v1.0.0
        if: startsWith(github.event.pull_request.title, 'fix')
        with:
          token: '${{ secrets.GITHUB_TOKEN }}'
          label: 'type: bug'
      - uses: netlify/pr-labeler-action@v1.0.0
        if: startsWith(github.event.pull_request.title, 'chore')
        with:
          token: '${{ secrets.GITHUB_TOKEN }}'
          label: 'type: chore'
      - uses: netlify/pr-labeler-action@v1.0.0
        if: startsWith(github.event.pull_request.title, 'feat')
        with:
          token: '${{ secrets.GITHUB_TOKEN }}'
          label: 'type: feature'
```
