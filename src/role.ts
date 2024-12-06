export const RoleList = ['admin', 'visitor'] as const;

export type RoleType = (typeof RoleList)[number];

const domainRoleSetting = new Map<string, RoleType[]>([
  ['@hoge.com', [...RoleList]],
  ['@fuga.com', [...RoleList]],
  ['@piyo.com', ['visitor']],
]);

const specificRoleSetting: Map<string, RoleType[]> = new Map([
  ['hoge@example.com', ['admin', 'visitor']],
  ['fuga@example.com', ['admin', 'visitor']],
  ['piyo@example.com', ['visitor']],
]);

export const getRoles = (authedUser: string): RoleType[] => {
  for (const [k, v] of domainRoleSetting.entries()) {
    if (authedUser.endsWith(k)) {
      return v;
    }
  }

  const specificRoles = specificRoleSetting.get(authedUser);
  if (specificRoles != null) {
    return [...specificRoles];
  }

  return [];
};
