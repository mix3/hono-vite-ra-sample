import { RoleType } from './role';

declare global {
  // eslint-disable-next-line no-var
  var roles: RoleType[];
}

export const getRoleSet = (): Set<RoleType> => {
  return new Set(globalThis.window.roles);
};
