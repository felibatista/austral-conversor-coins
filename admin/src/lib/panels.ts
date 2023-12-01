export interface Panel {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const PANELS: Panel[] = [
  {
    id: 'usuarios',
    title: 'Usuarios',
    description: 'Administra los usuarios de la aplicación',
    icon: "users.svg",
    link: '/admin/usuarios',
  },

  {
    id: 'divisas',
    title: 'Divisas',
    description: 'Administra las divisas de la aplicación',
    icon: 'currency.svg',
    link: '/admin/divisas',
  },
  {
    id: 'conversiones',
    title: 'Conversiones',
    description: 'Administra las conversiones de la aplicación',
    icon: 'convert.svg',
    link: '/admin/conversiones',
  },

  {
    id: 'sistema',
    title: 'Sistema',
    description: 'Administra el sistema de la aplicación',
    icon: 'system.svg',
    link: '/admin/sistema',
  },
];
