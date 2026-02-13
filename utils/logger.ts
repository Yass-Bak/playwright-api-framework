export class Logger {
  static info(message: string, data?: any): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
  }

  static error(message: string, error?: any): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  }

  static debug(message: string, data?: any): void {
    if (process.env.DEBUG === 'true') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  }

  static logRequest(method: string, url: string): void {
    this.info(`${method} ${url}`);
  }

  static logResponse(method: string, url: string, status: number, responseTime: number): void {
    this.info(`${method} ${url} - Status: ${status} - Time: ${responseTime}ms`);
  }
}
