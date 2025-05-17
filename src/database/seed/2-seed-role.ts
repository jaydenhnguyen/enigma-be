import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { Permission, PermissionDocument, Role, RoleDocument } from 'src/rbac/schemas';
import { PERMISSIONS, ROLES } from '../../rbac/constants';

@Injectable()
export class RoleSeeder {
  constructor(
    private readonly logger: AppLoggerService,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async run() {
    const count = await this.roleModel.estimatedDocumentCount();

    if (count > 0) {
      this.logger.log(`${Role.name} is already seeded`);
      return;
    }

    try {
      const allPermission = (await this.permissionModel.findOne({ permissionName: PERMISSIONS.ALL })) as Types.ObjectId;

      const createEventPermission = (await this.permissionModel.findOne({
        permissionName: PERMISSIONS.CREATE_EVENT,
      })) as Types.ObjectId;

      const viewAllEventPermission = (await this.permissionModel.findOne({
        permissionName: PERMISSIONS.VIEW_ALL_EVENT,
      })) as Types.ObjectId;

      if (!allPermission || !createEventPermission || !viewAllEventPermission) {
        this.logger.error('Required permissions not found. Please seed permissions first.');
        return;
      }

      const rolesToSeed: Role[] = [
        {
          roleName: ROLES.SUPER_ADMIN,
          description: 'Super admin with all permissions',
          permissions: [allPermission._id],
        },
        {
          roleName: ROLES.ADMIN,
          description: 'Admin with event create and view permissions',
          permissions: [createEventPermission._id, viewAllEventPermission._id],
        },
        {
          roleName: ROLES.EMPLOYEE,
          description: 'Employee with no permissions',
          permissions: [],
        },
      ];

      await this.roleModel.insertMany(rolesToSeed);
      this.logger.log(`${Role.name} seeded successfully.`);
    } catch (err) {
      this.logger.error(`Failed to seed ${Role.name}: `, err);
    }
  }
}
