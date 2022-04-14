// Menus
export const MENUS = [
  {
    name: 'user-management',
    href: '/user-management',
    label: 'User Management',
    icon: 'fas fa-user'
  },
  {
    name: 'master',
    href: '/master',
    label: 'Master',
    icon: 'fas fa-key',
    childs: [
      {
        name: 'group-chat',
        href: '/group-chat',
        label: 'Group Chat'
      },
      {
        name: 'member',
        href: '/member',
        label: 'Member'
      },
      {
        name: 'artikel',
        href: '/article',
        label: 'Artikel'
      },
      {
        name: 'faq',
        href: '/faq',
        label: 'FAQ'
      },
      {
        name: 'webinar',
        href: '/webinar',
        label: 'Webinar'
      },
      {
        name: 'stock',
        href: '/stock',
        label: 'Saham'
      },
      {
        name: 'hashtag',
        href: '/hashtag',
        label: 'Hashtags'
      }
      // {
      //   name: 'investment-account',
      //   href: '/investment-account',
      //   label: 'Akun Investasi'
      // }
      // {
      //   name: 'biaya-berlangganan',
      //   href: '/biaya-berlangganan',
      //   label: 'Biaya Berlangganan'
      // }
    ]
  }
];
