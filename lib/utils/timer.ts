/**
 * Utility class for measure time between to operations.
 */
export default class Timer {
  private startTime: number = 0
  private endTime: number = 0
  private timePassedInSeconds = 0
  /**
   * Class constructor
   */
  constructor() {}
  /**
   * Mark start
   *
   * @returns {void}
   */
  public start(): void {
    this.startTime = performance.now()
  }
  /**
   * Mark end.
   *
   * @returns {void}
   */
  public end(): void {
    this.endTime = performance.now()
    /**
     * In miliseconds
     */
    let timeDiff = this.endTime - this.startTime
    /**
     * strip the ms
     */
    timeDiff /= 1000
    /**
     * Get seconds
     */
    this.timePassedInSeconds = Math.round(timeDiff)
  }
  /**
   * Return time elapsed in seconds.
   *
   * @returns {Number}
   */
  public geTimePassedInSeconds(): number {
    return this.timePassedInSeconds
  }
}
