import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from 'src/rbac/schemas';
import { PERMISSIONS } from 'src/rbac/constants';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    private readonly logger: AppLoggerService,
  ) {}

  async run() {
    const count = await this.permissionModel.estimatedDocumentCount();

    if (count > 0) {
      this.logger.log(`${Permission.name} is already seeded`);
      return;
    }

    try {
      await this.permissionModel.insertMany([
        {
          permissionName: PERMISSIONS.ALL,
          description: 'Access to all permissions',
        },
        {
          permissionName: PERMISSIONS.CREATE_EVENT,
          description: 'Create new events',
        },
        {
          permissionName: PERMISSIONS.VIEW_ALL_EVENT,
          description: 'View all events',
        },
      ]);
      this.logger.log(`${Permission.name} seeded successfully.`);
    } catch (err) {
      this.logger.error(`Failed to seed ${Permission.name}: `, err);
    }
  }
}
