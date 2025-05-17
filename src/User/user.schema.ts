import { Types } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role } from 'src/rbac/schemas/role.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, enum: ['G1', 'G2', 'GF', null], default: null })
  drivingLicenseType: string | null;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Role.name }], default: [] })
  roles: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}
