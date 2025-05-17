import { Module } from '@nestjs/common';
import { PermissionSeeder } from './1-seed-permission';
import { RoleSeeder } from './2-seed-role';

import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema, Role, RoleSchema } from 'src/rbac/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [PermissionSeeder, RoleSeeder],
  exports: [PermissionSeeder, RoleSeeder],
})
export class SeederModule {}
