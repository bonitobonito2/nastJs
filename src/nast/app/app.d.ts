import { Container } from "../containers/mainContainer";

import { Server } from "../server/server";

/**
 * The factory class for setting up and managing a Nest.js-like application.
 */
export declare class NastFactory {
  private container: Container;
  private static instance: NastFactory;
  private appModule: any;
  private server: Server;

  constructor();

  /**
   * Creates and returns the singleton instance of NastFactory.
   * @param object The application module object.
   * @returns The singleton instance of NastFactory.
   */
  public static create(object: any): NastFactory;

  /**
   * Adds middleware to the server.
   * @param middleware The middleware function to be added.
   */
  public addMiddleware(middleware: Function): void;

  /**
   * Set up all modules and start listening on the specified port.
   * @param port The port number to listen on.
   */
  public listen(port: number): void;
}
