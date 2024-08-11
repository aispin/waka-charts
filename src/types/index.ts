/**
 * @file This file contains all the types used in the application
 * @link https://wakatime.com/developers#stats
 */
export interface ICategoryStats {
  name: string // name of category, for ex: Coding or Debugging
  total_seconds: number // total coding activity as seconds
  percent: number // percent of time spent in this category
  digital: string // total coding activity for this category in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this category
  minutes: number // minutes portion of coding activity for this category
}

export interface IProjectStats {
  name: string // project name
  total_seconds: number // total coding activity as seconds
  percent: number // percent of time spent in this project
  digital: string // total coding activity for this project in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this project
  minutes: number // minutes portion of coding activity for this project
}

export interface ILanguageStats {
  name: string // language name
  total_seconds: number // total coding activity spent in this language as seconds
  percent: number // percent of time spent in this language
  digital: string // total coding activity for this language in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this language
  minutes: number // minutes portion of coding activity for this language
  seconds: number // seconds portion of coding activity for this language
}

export interface IEditorStats {
  name: string // editor name
  total_seconds: number // total coding activity spent in this editor as seconds
  percent: number // percent of time spent in this editor
  digital: string // total coding activity for this editor in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this editor
  minutes: number // minutes portion of coding activity for this editor
  seconds: number // seconds portion of coding activity for this editor
}

export interface IOSStats {
  name: string // os name
  total_seconds: number // total coding activity spent in this os as seconds
  percent: number // percent of time spent in this os
  digital: string // total coding activity for this os in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this os
  minutes: number // minutes portion of coding activity for this os
  seconds: number // seconds portion of coding activity for this os
}

export interface IDependencyStats {
  name: string // dependency name
  total_seconds: number // total coding activity spent in this dependency as seconds
  percent: number // percent of time spent in this dependency
  digital: string // total coding activity for this dependency in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this dependency
  minutes: number // minutes portion of coding activity for this dependency
  seconds: number // seconds portion of coding activity for this dependency
}

export interface IMachineStats {
  name: string // machine hostname and ip address
  machine_name_id: string // unique id of this machine
  total_seconds: number // total coding activity spent on this machine as seconds
  percent: number // percent of time spent on this machine
  digital: string // total coding activity for this machine in digital clock format
  text: string // total coding activity in human readable format
  hours: number // hours portion of coding activity for this machine
  minutes: number // minutes portion of coding activity for this machine
  seconds: number // seconds portion of coding activity for this machine
}

export interface IDayStats {
  date: string // day with most coding time logged as Date string in YEAR-MONTH-DAY format
  text: string // total coding activity for this day in human readable format
  total_seconds: number // number of seconds of coding activity, including other language, for this day
}

export interface IWakaStats {
  total_seconds: number // total coding activity, excluding "Other" language, as seconds for the given range of time
  total_seconds_including_other_language: number // total coding activity as seconds for the given range of time
  human_readable_total: string // total coding activity, excluding "Other" language, as human readable string
  human_readable_total_including_other_language: string // total coding activity as human readable string
  daily_average: number // average coding activity per day as seconds for the given range of time, excluding Other language
  daily_average_including_other_language: number // average coding activity per day as seconds for the given range of time
  human_readable_daily_average: string // daily average as human readable string, excluding Other language
  human_readable_daily_average_including_other_language: string // daily average as human readable string
  categories: ICategoryStats[] // array of category stats
  projects: IProjectStats[] // array of project stats
  languages: ILanguageStats[] // array of language stats
  editors: IEditorStats[] // array of editor stats
  operating_systems: IOSStats[] // array of operating system stats
  dependencies: IDependencyStats[] // array of dependency stats
  machines: IMachineStats[] // array of machine stats
  best_day: IDayStats // best day stats
  range: string // time range of these stats
  human_readable_range: string // time range as human readable string
  holidays: number // number of days in this range with no coding time logged
  days_including_holidays: number // number of days in this range
  days_minus_holidays: number // number of days in this range excluding days with no coding time logged
  status: string // status of these stats in the cache
  percent_calculated: number // percent these stats have finished updating in the background
  is_already_updating: boolean // true if these stats are being updated in the background
  is_coding_activity_visible: boolean // true if this user's coding activity is publicly visible
  is_other_usage_visible: boolean // true if this user's languages, editors, and operating system stats are publicly visible
  is_stuck: boolean // true if these stats got stuck while processing and will be recalculated in the background
  is_including_today: boolean // true if these stats include the current day; normally false except range "all_time"
  is_up_to_date: boolean // true if these stats are up to date; when false, stats are missing or from an old time range and will be refreshed soon
  start: string // start of this time range as ISO 8601 UTC datetime
  end: string // end of this time range as ISO 8601 UTC datetime
  timezone: string // timezone used in Olson Country/Region format
  timeout: number // value of the user's keystroke timeout setting in minutes
  writes_only: boolean // status of the user's writes_only setting
  user_id: string // unique id of this user
  username: string // public username for this user
  created_at: string // time when these stats were created in ISO 8601 format
  modified_at: string // time when these stats were last updated in ISO 8601 format
}

export interface IWakaStatsResponse {
  data: IWakaStats
}

export type TVirtualDocBody = d3.Selection<d3.BaseType, unknown, null, undefined>

export interface IVirtualDom {
  document: Document
  body: TVirtualDocBody
}

export interface IChartOpts {
  /**
   * Width of the SVG element
   * @default 540
   */
  svgWidth: number
  /**
   * Height of the SVG element
   * @default 168
   */
  svgHeight: number
  /**
   * Height of each bar in the chart.
   * The `svgHeight` will be calculated based on the value of `svgBarHeight` if `isDynamicHeight` is `true`.
   * @default 34
   */
  svgBarHeight: number
  /**
   * Margin on the X-axis
   * @default 12
   */
  marginX: number
  /**
   * Margin on the Y-axis
   * @default 4
   */
  marginY: number
  /**
   * Padding between elements
   * @default 2
   */
  padding: number
  /**
   * Width of the names column
   * @default 100
   */
  namesWidth: number
  /**
   * Width of the durations column
   * @default 110
   */
  durationsWidth: number
  /**
   * Flag to indicate if the chart is in black mode
   * @default false
   */
  isBlackMode: boolean

  /**
   * Flag to indicate if the height of the SVG element should be calculated based on the value of `svgBarHeight`
   * @default true
   */
  isDynamicHeight: boolean
}
