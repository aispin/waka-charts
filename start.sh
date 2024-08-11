#!/bin/bash

set -e

cd /app

# `GITHUB_ACTOR` and `GITHUB_REPOSITORY` are provided by GitHub Actions
# The custom parameters are defined in the `action.yml`, and passed to the runtime according to the GitHub Actions naming convention,
# with the `INPUT_` prefix as the parameter name.

REMOTE_REPOSITORY="https://${GITHUB_ACTOR}:${INPUT_GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

node dist/index.mjs

if [ -d "dist/generated" ]; then
    echo -e "\n✅-Listing contents of `dist/generated`:\n"
    ls -l dist/generated
else
    echo -e "\n❌-`dist/generated` directory does not exist."
    exit 1
fi

git config --global user.email "${INPUT_GIT_USER_EMAIL}"
git config --global user.name "${INPUT_GIT_USER_NAME}"
git clone --single-branch --branch "${INPUT_BRANCH_NAME}" "${REMOTE_REPOSITORY}" repo > /dev/null

echo "💡-Clone ${GITHUB_REPOSITORY} to the `repo` folder"

cd repo

echo "💡-Enter the `repo` directory"

git remote add publish "${REMOTE_REPOSITORY}" > /dev/null

if [[ ! -d "${INPUT_IMAGES_FOLDER}" ]]
then
    mkdir -p "${INPUT_IMAGES_FOLDER}"
    echo "💡-Created `${INPUT_IMAGES_FOLDER}` folder"
else
    echo "💡-`${INPUT_IMAGES_FOLDER}` folder already exists"
fi

cp -a ../dist/generated/. "${INPUT_IMAGES_FOLDER}"

echo "✅-Copied generated files to ${INPUT_IMAGES_FOLDER}"

git add "${INPUT_IMAGES_FOLDER}" > /dev/null

if [ -n "$(git status --porcelain)" ]
then
    git commit -m "${INPUT_COMMIT_MESSAGE}" > /dev/null
    echo "💡-Commit changes"
    git push publish ${INPUT_BRANCH_NAME} > /dev/null
    echo "✅-Changes pushed to the remote"
else
    echo "💡-No changes to be committed"
fi
