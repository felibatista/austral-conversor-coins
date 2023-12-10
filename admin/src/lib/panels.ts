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
    description: 'Administra los usuarios de la aplicación. Podrás editar y eliminar usuarios, al igual que ver sus datos.',
    icon: "users.svg",
    link: '/admin/usuarios',
  },
  {
    id: 'divisas',
    title: 'Divisas',
    description: 'Administra las divisas de la aplicación. Crea nuevas divisas, edita las existentes y elimina las que no necesites.',
    icon: 'bitcoin.svg',
    link: '/admin/divisas',
  },
  {
    id: 'conversiones',
    title: 'Conversiones',
    description: 'Administra las conversiones de la aplicación. Podrás ver su moneda emisora y receptora, y también, de que usuario provienen.',
    icon: 'swap.svg',
    link: '/admin/conversiones',
  },
];
