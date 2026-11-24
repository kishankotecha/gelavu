import { User } from '../../database/entities/user.entity';

const MASKED_BANK_ACCOUNT = '••••••••';

/**
 * Shapes a User entity for API responses. Returns a copy (never mutates the entity)
 * and never exposes the raw bank account number.
 */
export function serializeUser(user: User) {
  const { host_profile, ...rest } = user;
  return {
    ...rest,
    host_profile: host_profile
      ? {
          ...host_profile,
          bank_account_number_encrypted: host_profile.bank_account_number_encrypted
            ? MASKED_BANK_ACCOUNT
            : null,
        }
      : host_profile,
  };
}
