import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const NavigationConfig = {
    0: [ // Guest / not logged in
        // Adding products section
        {
            name: "Products",
            submenus: [
                { name: 'Analytics', to: '#', icon: ChartPieIcon, description: 'Get a better understanding of your traffic' },
                { name: 'Engagement', to: '#', icon: CursorArrowRaysIcon, description: 'Speak directly to your customers', },
                { name: 'Security', to: '#', icon: FingerPrintIcon, description: 'Your customers’ data will be safe and secure' },
                { name: 'Integrations', to: '#', icon: SquaresPlusIcon, description: 'Connect with third-party tools' },
                { name: 'Automations', to: '#', icon: ArrowPathIcon, description: 'Build strategic funnels that will convert' },
            ]
        },

        // Adding callsToAction section
        {
            name: "Actions",
            submenus: [
                { name: 'Watch demo', to: '#', icon: PlayCircleIcon },
                { name: 'Contact sales', to: '#', icon: PhoneIcon },
            ]
        }
    ],
    1: [ // Admin
        { name: "Home", to: "/admin/admindashboard", submenus: null },
        {
            name: "Publications", submenus: [
                { name: "View Publications", to: "/admin/viewpublications" },
                { name: "Review Publications", to: "/admin/reviewpublication" },
            ]
        },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
        { name: "Notifications", to: "/admin/notifications", submenus: null },
    ],
    2: [ //User
        { name: "Home", to: "/author/authordashboard", submenus: null },
        { name: "Books", to: "/author/addbook", submenus: null },
        {
            name: "Blogs", submenus: [
                { name: "Create Blog", to: "/createblog" },
                { name: "View Blogs", to: "/viewblogs" },
            ]
        },
        { name: "Notifications", to: "/author/notifications", submenus: null },
    ],
}

export const getNavigationConfig = (userType) => {
    return NavigationConfig[userType] || NavigationConfig[0];
};