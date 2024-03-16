/**
 * Utility class for measure time between to operations.
 */
export default class Timer {
  private startTime: number = 0
  private endTime: number = 0
  private timePassedInSeconds: string = ""
  /**
   * Class constructor.
   */
  constructor() {}
  /**
   * Mark start.
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
     * In miliseconds.
     */
    let timeDiff = this.endTime - this.startTime
    /**
     * Convert to seconds.
     */
    timeDiff /= 1000
    /**
     * Format seconds.miliseconds as 3 decimal places.
     */
    this.timePassedInSeconds = timeDiff.toFixed(3)
  }
  /**
   * Return time elapsed in seconds.
   *
   * @returns {Number}
   */
  public geTimePassedInSeconds(): string {
    return this.timePassedInSeconds
  }
}
