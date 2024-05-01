import { logger } from "./Logger";

/**
 * Retrieves the value of the specified environment variable.
 * @param name The name of the environment variable to retrieve.
 * @returns The value of the environment variable.
 * @throws Will throw an error if the environment variable is not set.
 */
export function getEnvVariable(name: string): string {
  const value = process.env[name];

  // Check if the environment variable is set
  if (!value) {
    // Log an error message if the environment variable is not set
    logger.error(`The '${name}' environment variable is not set.`);
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
