import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

// TRANSIENT - instantiating once per provider
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
    console.log('Testing injection scopes. Call from constructor');
  }
  customLog() {
    console.log('Custom log');
  }
}
