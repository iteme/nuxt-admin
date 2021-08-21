import type { MenuItem } from '@/types/model';

export const queryMenus: () => MenuItem[] = () => [
  {
    code: 'config',
    name: '信息配置',
    path: '/config',
    icon: 'el-icon-tickets',
    children: [
      {
        code: 'configDict',
        name: '字典管理',
        path: '/config/dict',
      },
    ],
  },
  {
    code: 'system',
    name: '系统管理',
    path: '/system',
    icon: 'el-icon-s-custom',
    children: [
      {
        code: 'systemUser',
        name: '用户管理',
        path: '/system/user',
      },
    ],
  },
];
