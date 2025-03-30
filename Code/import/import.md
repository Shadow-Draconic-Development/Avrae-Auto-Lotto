<h1>Import Subalias<img align="right" src="../../Data/images/main.png" width="100px"></h1>

Allows users (requires administrative privileges) to import settings from generated JSONs to SVAR.

## Setting import
[Reward Generator](https://shadow-draconic-development.github.io/Avrae-Auto-Lotto/) is where you go to generate rewards.

- `Add Reward` - Creates a new reward with the following
    - `Reward Name` - This is just for indexing sake and for you to edit the rewards in the future.
    - `Reward description` - This is where you outline what the reward is. This supports inline rolling (by using {} and #d# e.g. `{1d6}`) and markdown.
    - `Reward weight` - This is the weight of the reward. The higher the number, the more likely it is to be rolled. For equal weights, the reward will be rolled randomly with equal chance.

## Usage
`!lotto import [JSON string]`
- `JSON string`
    - Required
    - Simply paste the output of the JSON provided from generator