import { Plugin } from 'rollup'

export interface DenoLintRules {
  /**
   * Use all rules if set to `true`, otherwise only the recommended ones.
   * @default false
   */
   all?: boolean

  /**
   * List of rules to include extra, if only recommended rules are enabled.
   * @default []
   */
   include?: string[]

   /**
   * List of rules to exclude from all or recommended ones.
    * @default []
    */
   exclude?: string[]
}

export type DenoLintFormatter = (messages: string[], id: string, source: string) => string[];

export interface DenoLintOptions {
  /**
   * List of source file patterns to include.
   * @default ['** /*.js', '** /*.jsx', '** /*.ts', '** /*.tsx']
   */
  include?: string[] | string

  /**
   * List of source file patterns or a regex to exclude.
   * @default /node_modules/
   */
  exclude?: string[] | string | RegExp

  /**
   * Config file to load the tag and rule inclusion and exclusion lists from.
   * File inclusion and exclusion lists are ignored. Use `include` and `exclude`
   * options of this plugin.
   * @default '.denolint.json'
   */
  configFile?: string

  /**
   * Do not look for `.denolint.json` by default.
   * @default false
   */
  ignoreConfig?: boolean

  /**
   * Rules to include or exclude. If specified, the config file will be ignored.
   * @default undefined
   */
  rules?: DenoLintRules

  /**
   * Throw an error and abort if any warnings were reported.
   * @default false
   */
  throwOnWarning?: boolean

  /**
   * Throw an error and abort if source file parsing failed fatally.
   * @default true
   */
  throwOnError?: boolean

  /**
   * Format of the warning messages.
   * @default stylish
   */
  format?: 'compact' | 'pretty'

  /**
   * Custom warning and error formatter.
   * @default stylish
   */
  formatter?: DenoLintFormatter
}

export type DenoLintAllFormatter = (messages: string[]) => string[];

export interface DenoLintAllOptions {
  /**
   * Paths to source files to include. Overrides `files.include`.
   * @default undefined
   */
  include?: string[]

  /**
   * Paths to source files to exclude. Overrides `files.exclude`.
   * @default undefined
   */
  exclude?: string[]

  /**
   * Config file to load the tag, file and rule inclusion and exclusion lists from.
   * @default '.denolint.json'
   */
  configFile?: string

  /**
   * Do not look for `.denolint.json` by default.
   * @default false
   */
  ignoreConfig?: boolean

  /**
   * Throw an error and abort if any warnings were reported.
   * @default false
   */
  throwOnWarning?: boolean

  /**
   * Throw an error and abort if source file parsing failed fatally.
   * @default true
   */
  throwOnError?: boolean

  /**
   * Format of the warning messages.
   * @default stylish
   */
  format?: 'compact' | 'pretty'

  /**
   * Custom warning and error formatter.
   * @default stylish
   */
  formatter?: DenoLintAllFormatter
}

export function denolint(options?: DenoLintOptions): Plugin

export function denolintAll(options?: DenoLintAllOptions): Plugin
