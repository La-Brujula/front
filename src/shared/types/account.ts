import { z } from 'zod';

export type AccountRoleTypes = 'user' | 'editor' | 'manager' | 'admin';

export const ACCOUNT_CONTACT_METHODS = ['email', 'whatsapp'] as const;
export type AccountContactMethod = (typeof ACCOUNT_CONTACT_METHODS)[number];

export interface IAccount {
  email: string;
  password: string;
  role: AccountRoleTypes;
  passwordResetPinExpirationTime?: Date;
  passwordResetPin?: string;
  passwordRecoveryAttempts: number;
  ProfileId: string;
}

export interface IUpdateAccount {
  password?: string;
  role?: AccountRoleTypes;
  passwordResetPinExpirationTime?: Date | null;
  passwordResetPin?: string | null;
  passwordRecoveryAttempts?: number;
}

export const UpdateAccountRequestParams = z.object({
  contactMethod: z.optional(z.enum(ACCOUNT_CONTACT_METHODS)),
  jobNotifications: z.preprocess((val) => val === 'true', z.boolean()),
});

export type UpdateAccountRequest = z.infer<typeof UpdateAccountRequestParams>;

export interface IAccountDTO {
  email: string;
  role: AccountRoleTypes;
  ProfileId: string;
  contactMethod: AccountContactMethod;
  jobNotifications: boolean;
}

export interface IAuthenticationRequestBody {
  email: string;
  password: string;
  type?: 'moral' | 'fisica';
}

export interface IAuthenticationResponseBody {
  account: IAccountDTO;
  token: string;
}

export interface IResetPasswordRequestBody {
  email: string;
}

export interface IChangePasswordRequestBody {
  password: string;
  resetPin: string;
}

export interface IJwtToken {
  email: string;
  role: string;
  ProfileId: string;
  exp: number;
  iat: number;
}
