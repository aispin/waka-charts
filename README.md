![waka-charts](https://socialify.git.ci/mamboer/waka-charts/image?description=1&font=Inter&forks=1&issues=1&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fmamboer%2Fwaka-charts%2Fmain%2Flogo.svg&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Auto)

---

<table style="background: #eeeeee; margin-bottom: 24px">
  <tr style="background: #212121">
    <th>Light Mode</th>
    <th>Dark Mode</th>
  </tr>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/mamboer/waka-charts/main/images/waka_weekly_lang_stats.svg" alt="Weekly Language Stats" />
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/mamboer/waka-charts/main/images/waka_weekly_lang_stats_black.svg" alt="Weekly Language Stats" />
    </td>
  </tr>
</table>

# 📊 WakaCharts - Your Fancy Code Statistics

A bot that Updating your [WakaTime](https://wakatime.com/) stats automatically in the form of SVG charts.

Build with Github Action and [WakaTime API](https://wakatime.com/developers#stats), inspired by [dvjn/wakatime-charts](https://github.com/dvjn/wakatime-charts) but totally rewritten in Typescript.

## Project Status

[![codecov](https://codecov.io/gh/mamboer/waka-charts/graph/badge.svg?token=XGKUS6DRSZ)](https://codecov.io/gh/mamboer/waka-charts)
![Build Status](https://github.com/mamboer/waka-charts/actions/workflows/test.yml/badge.svg)
![License](https://img.shields.io/github/license/mamboer/waka-charts)

## 🚀 How to Use

### Set it up in your repository ⚙️

1. Add your wakatime api key from [here](https://wakatime.com/settings/api-key), in your repository secrets with the name `WAKATIME_API_KEY`.

2. Go to actions tab of your repository, click `New workflow`, and then click the link `set up a workflow yourself`.

3. Replace all the file contents with the following:

   ```yaml
   name: Waka Charts

   on:
     workflow_dispatch:
     schedule:
       - cron: '0 0 * * *'

   jobs:
     update-charts:
       name: Update wakatime stats charts
       runs-on: ubuntu-latest
       steps:
         - uses: mamboer/waka-charts@main
           with:
             # Required - Your WakaTime API Key
             WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
             # Optional - GitHub access token, Only required if using the action in repository other than profile
             GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
             # Optional - Limit the number of languages to show in the chart
             WAKATIME_LANG_LIMIT: 5
             # Optional - Width of the chart
             WAKATIME_CHART_WIDTH: 540
             # Optional - Height of the chart
             WAKATIME_CHART_HEIGHT: 168
             # Optional - Bar Height of the chart
             WAKATIME_CHART_BAR_HEIGHT: 34
             # Optional - Margin X of the chart
             WAKATIME_CHART_MARGIN_X: 12
             # Optional - Margin Y of the chart
             WAKATIME_CHART_MARGIN_Y: 4
             # Optional - Padding of the chart
             WAKATIME_CHART_PADDING: 2
             # Optional - Width of the `name` column
             WAKATIME_CHART_COL_NAME_WIDTH: 100
             # Optional - Width of the `durations` column
             WAKATIME_CHART_COL_DURATION_WIDTH: 110
             # Optional - Calculate the height of the chart dynamically based on the number of languages and bar height
             WAKATIME_CHART_DYNAMIC_HEIGHT: true
             # Optional - Branch that needs to updated
             BRANCH_NAME: main
             # Optional - Commit message on each update of charts
             COMMIT_MESSAGE: 📊 Update WakaCharts by WakaCharts-Bot
             # Optional - Name of the folder in which generated charts will be shown
             IMAGES_FOLDER: images
   ```

   **Notice**: If you are adding this action to your profile repository (`<username>/<username>`), the `GITHUB_TOKEN` is optional, or add your [Github API Token](https://github.com/settings/tokens) in your repository secrets with the name `GH_TOKEN`.

   You can view the [workflow definition file](action.yml) in this repository for reference.

4. Commit this workflow file.

   **Notice**: The action will run at 00:00 UTC everyday to update the images.

### 🐰 Using the generated images

Link for the generated images is:
`https://raw.githubusercontent.com/<username>/<repository>/<branch_name>/<images_folder>/<chart_name>.svg`

Where, the chart name is one of `waka_weekly_lang_stats` and `waka_weekly_lang_stats_black`.

## ♥️ Inspiration

- [dvjn/wakatime-charts](https://github.com/dvjn/wakatime-charts)
