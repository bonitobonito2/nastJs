/**
 * Decorator function to register a route handler for HTTP POST requests in the container.
 * @param value The URL route for the handler (optional). Defaults to "/" if not provided.
 * @returns The decorator function that registers the handler in the container.
 */
export declare function Post(value?: string): (target: Object, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
