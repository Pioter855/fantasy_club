import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import * as fs from 'fs';
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const packageJson = await fs.promises.readFile('./package.json');
    const { version } = JSON.parse(packageJson.toString());

    return this.health.check([
      () => this.db.pingCheck('database'),
      () => ({ version }),
    ]);
  }
}
