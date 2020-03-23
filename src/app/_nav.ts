import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  // {
  //   name: 'HOME',
  //   url: '/home',
  //   icon: 'cil-home',

  // },

  // {
  //   name: 'Dashboard',
  //   url: '/home',
  //   icon: 'cil-chart',

  // },

  // {
  //   name: 'Appointments',
  //   url: '/home',
  //   icon: 'cil-calendar',

  // },

  // {
  //   name: 'Dictations',
  //   url: '/home',
  //   icon: 'cil-microphone',

  // },

  // {
  //   name: 'Reports',
  //   url: '/home',
  //   icon: 'cil-notes',

  // },

  // {
  //   name: 'Colleagues',
  //   url: '/home',
  //   icon: 'cil-share-alt',

  // },
  // {
  //   name: '',
  //   url: '',
  //   icon: '',

  // },
  // {
  //   name: '',
  //   url: '',
  //   icon: '',

  // },


  // {
  //   name: 'Settings',
  //   url: '/home',
  //   icon: 'icon-settings',

  // },

  // {
  //   name: 'Help',
  //   url: '/home',
  //   icon: 'cil-user',

  // },

  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',

  // },  {
  //   name: 'About Us',
  //   url: '/aboutus',
  //   icon: 'icon-speedometer',

  // },
  //  {
  //   name: 'Doctors',
  //   url: '/doctors',
  //   icon: 'icon-speedometer',

  // },
  // {
  //   name: 'Speciality',
  //   url: '/speciality',
  //   icon: 'icon-speedometer',

  // },
  // {
  //   name: 'Login',
  //   url: '/signin',
  //   icon: 'icon-speedometer',

  // },

  // {
  //   name: 'Where does it hurts?',
  //   url: '/ankle',
  //   icon: 'icon-speedometer'
  // },

  // {
  //   name: 'locations',
  //   url: '/locations'
  // },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },



  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },



  //-------User routing-----------//
  {
    title: true,
    name: 'Settings'

  },
   {
    name: 'Users',
    url: '/users',
    icon: 'icon-user',
    children: [
      {
        name: 'CreateUsers',
        url: 'users/createNew',

      },
      {
        name: 'ManageUsers',
        url: 'users/ManageUser',

      },
      {
        name: 'ManageLicenceAgreement',
        url: 'users/ManageLicenceAgreement',

      },
      {
        name: 'ProviderWorkSchedule',
        url: 'users/ProviderWorkSchedule',

      },
    ]
  },
 //-------User routing ends-----------//
  //-----------Practice/Location--------------//
  {
    title: true,
    name: 'Practice/Location'
  },
  {
    name: 'Practice/Location',
    url: '/PracticeLocation',
    icon: 'icon-location-pin',
    children: [
      {
        name: 'Manage Practice/Location',
        url: 'PracticeLocation/ManagePracticeLocation',
      },
      {
        name: 'Manage Practice/LocationSubscription',
        url: 'PracticeLocation/ManagePracticeSubscription',
      },
      {
        name: 'Manage Practice/LocationReferral',
        url: 'PracticeLocation/ManagePracticeReferral',
      },
    ]
  },
//-----------Practice/Location end--------------//
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },

  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },

];
