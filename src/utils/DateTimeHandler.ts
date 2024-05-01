class DateTimeHandler {
  /**
   * Retrieves the current date and time formatted into its individual components.
   * @returns An object containing the formatted date and time components.
   */
  private static getFormattedDateTime(): {
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
  } {
    // Get the current date and time
    const now = new Date();

    // Format the date and time components into strings with leading zeros as needed
    return {
      year: now.getUTCFullYear().toString(),
      month: (now.getUTCMonth() + 1).toString().padStart(2, "0"),
      day: now.getUTCDate().toString().padStart(2, "0"),
      hours: now.getUTCHours().toString().padStart(2, "0"),
      minutes: now.getUTCMinutes().toString().padStart(2, "0"),
      seconds: now.getUTCSeconds().toString().padStart(2, "0"),
      milliseconds: now.getUTCMilliseconds().toString().padStart(3, "0"),
    };
  }

  /**
   * Gets the current date and time in a long format.
   * @returns A string representing the current date and time in the format 'YYYY-MM-DD HH:mm:ss.sss'.
   */
  public static getDateTimeLong(): string {
    const { year, month, day, hours, minutes, seconds, milliseconds } = this.getFormattedDateTime();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  /**
   * Gets the current date and time in a short format.
   * @returns A string representing the current date and time in the format 'YYYYMMDD-HHmmss'.
   */
  public static getDateTimeShort(): string {
    const { year, month, day, hours, minutes, seconds } = this.getFormattedDateTime();
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
  }
}

export default DateTimeHandler;
