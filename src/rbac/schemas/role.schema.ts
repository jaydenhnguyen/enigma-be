import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ROLES } from '../constants';
import { Permission } from './permission.schema';

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true, enum: ROLES })
  roleName: ROLES;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }], default: [] })
  permissions: Types.ObjectId[];
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);
