import { Plugin } from 'rollup'

interface Rules {
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

declare type Formatter = (messages: string[], id: string, source: string) => string[];

interface Options {
  /**
   * List of source file patterns to include.
   * @default ['** /*.js', '** /*.jsx', '** /*.ts', '** /*.tsx']
   */
  include?: string[] | string

  /**
   * List of source file patterns or a regex to exclude.
   * @default /node_modules/
   */
  exclude?: string[] | string | regex

  /**
   * Config file to load the tag, rule inclusion and exclusion lists from.
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
  rules?: Rules

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
   * Custom warning and error formatter.
   * @default stylish
   */
  formatter?: Formatter;
}

export function denolint(options?: Options): Plugin
