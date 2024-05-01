import fs from "fs";
import path from "path";
import DateTimeHandler from "./DateTimeHandler";

enum LogLevel {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

class Logger {
  private static instance: Logger;
  private readonly logFilePath: string;
  private readonly logDirectory: string = "./log";
  private currentLogLevel: LogLevel = LogLevel.INFO; // Default log level is INFO

  /**
   * Private constructor for the singleton Logger class.
   * Sets up the logging directory and file.
   */
  private constructor() {
    // Create the logging directory if it doesn't exist
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }

    // Determine the logging level from environment variables or default to INFO
    const levelName =
      (process.env.LOG_LEVEL as keyof typeof LogLevel) || "INFO";
    this.setLogLevel(LogLevel[levelName]);

    // Set the log file path using the current date and time
    const logFileName = `discountScraper_${DateTimeHandler.getDateTimeShort()}.log`;
    this.logFilePath = path.join(this.logDirectory, logFileName);
  }

  /**
   * Get the singleton instance of the Logger class.
   * @returns The Logger instance.
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Set the current log level.
   * @param level The log level to set.
   */
  private setLogLevel(level: LogLevel) {
    this.currentLogLevel = level;
  }

  /**
   * Determine if a message should be logged based on the log level.
   * @param level The log level of the message.
   * @returns True if the message should be logged, false otherwise.
   */
  private shouldLog(level: LogLevel): boolean {
    return level <= this.currentLogLevel;
  }

  /**
   * Write a log message to the log file.
   * @param level The log level as a string.
   * @param message The log message.
   * @param optionalParams Optional parameters to include in the log message.
   */
  private writeToFile(level: string, message: string, ...optionalParams: any[]): void {
    // Check if the message should be logged based on the log level
    if (!this.shouldLog(LogLevel[level as keyof typeof LogLevel])) {
      return;
    }

    // Compose the initial part of the log message
    const logMessage = `[${DateTimeHandler.getDateTimeLong()}] [${level}] ${message}`;

    try {
      // Append the initial message to the log file
      fs.appendFileSync(this.logFilePath, logMessage);

      // Append each optional parameter as addition to the initial entry in the log file
      optionalParams.forEach((param) => {
        let paramAsString;
        if (typeof param === "object") {
          paramAsString = JSON.stringify(param, null, 2); // Prettify objects
        } else {
          paramAsString = String(param); // Convert others to string
        }
        fs.appendFileSync(this.logFilePath, " " + paramAsString);
      });

      // Add a newline at the end of the log entry
      fs.appendFileSync(this.logFilePath, "\n");
    } catch (error) {
      console.error("Error writing to log file:", error);
    }
  }

  // Public logging methods
  public debug(message: string, ...optionalParams: any[]) {
    this.writeToFile("DEBUG", message, ...optionalParams);
  }

  public info(message: string, ...optionalParams: any[]) {
    this.writeToFile("INFO", message, ...optionalParams);
  }

  public warn(message: string, ...optionalParams: any[]) {
    this.writeToFile("WARN", message, ...optionalParams);
  }

  public error(message: string, ...optionalParams: any[]) {
    this.writeToFile("ERROR", message, ...optionalParams);
  }
}

// Exporting the singleton instance of Logger
export const logger = Logger.getInstance();
