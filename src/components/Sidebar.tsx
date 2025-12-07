
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   User, 
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Bell,
//   FileSearch,
//   FilePlus
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/context/auth';

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'Users', href: '/dashboard/users', icon: User },
//   // { name: 'Products', href: '/products', icon: FileSearch },
//   // { name: 'Orders', href: '/orders', icon: FilePlus },
//   { name: 'Settings', href: '/dashboard/settings', icon: Settings },
// ];

// export function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const { user } = useAuth();

//   return (
//     <div className={cn(
//       "bg-card border-r transition-all duration-300 ease-in-out",
//       collapsed ? "w-16" : "w-64"
//     )}>
//       <div className="flex h-full flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           {!collapsed && (
//             <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
//          Care App
//             </h1>
//           )}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hover:bg-muted"
//           >
//             {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-2 p-4">
//           {navigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               className={({ isActive }) =>
//                 cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
//                   isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
//                   collapsed && "justify-center"
//                 )
//               }
//             >
//               <item.icon className="h-5 w-5 flex-shrink-0" />
//               {!collapsed && <span>{item.name}</span>}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User Profile */}
//         <div className="border-t p-4">
//           <div className={cn(
//             "flex items-center gap-3",
//             collapsed && "justify-center"
//           )}>
//             <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-600" />
//             {!collapsed && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{user?.full_name}</p>
//                 <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   User, 
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   LucideIcon,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/context/auth';

// interface SubMenuItem {
//   name: string;
//   href: string;
// }
// interface NavigationItem {
//   name: string;
//   href?: string;
//   icon: LucideIcon;
//   subItems?: SubMenuItem[];
// }

// const navigation: NavigationItem[] = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { 
//     name: 'Users', 
//     icon: User,
//     subItems: [
//       { name: 'All Users', href: '/dashboard/users' },
//       { name: 'Providers', href: '/dashboard/users?user_type=provider' },
//       { name: 'Clients', href: '/dashboard/users?user_type=client' },
//     ]
//   },
//   { name: 'Settings', href: '/dashboard/settings', icon: Settings },
// ];

// export function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [openMenus, setOpenMenus] = useState<string[]>([]);
//   const { user } = useAuth();

//   const toggleMenu = (menuName: string) => {
//     setOpenMenus(prev => 
//       prev.includes(menuName) 
//         ? prev.filter(name => name !== menuName)
//         : [...prev, menuName]
//     );
//   };

//   const isMenuOpen = (menuName: string) => openMenus.includes(menuName);

//   return (
//     <div className={cn(
//       "bg-card border-r transition-all duration-300 ease-in-out",
//       collapsed ? "w-16" : "w-64"
//     )}>
//       <div className="flex h-full flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           {!collapsed && (
//             <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
//               Care App
//             </h1>
//           )}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hover:bg-muted"
//           >
//             {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-2 p-4">
//           {navigation.map((item) => (
//             <div key={item.name}>
//               {item.subItems ? (
//                 // Dropdown Menu Item
//                 <>
//                   <button
//                     onClick={() => !collapsed && toggleMenu(item.name)}
//                     className={cn(
//                       "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
//                       collapsed && "justify-center"
//                     )}
//                   >
//                     <item.icon className="h-5 w-5 flex-shrink-0" />
//                     {!collapsed && (
//                       <>
//                         <span className="flex-1 text-left">{item.name}</span>
//                         {isMenuOpen(item.name) 
//                           ? <ChevronUp className="h-4 w-4" />
//                           : <ChevronDown className="h-4 w-4" />
//                         }
//                       </>
//                     )}
//                   </button>

//                   {/* Sub Menu Items */}
//                   {!collapsed && isMenuOpen(item.name) && (
//                     <div className="mt-1 space-y-1 pl-8">
//                       {item.subItems.map((subItem) => (
//                         <NavLink
//                           key={subItem.name}
//                           to={subItem.href}
//                           className={({ isActive }) =>
//                             cn(
//                               "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
//                               isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
//                             )
//                           }
//                         >
//                           <span>{subItem.name}</span>
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 // Regular Menu Item
//                 <NavLink
//                   to={item.href!}
//                   className={({ isActive }) =>
//                     cn(
//                       "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
//                       isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
//                       collapsed && "justify-center"
//                     )
//                   }
//                 >
//                   <item.icon className="h-5 w-5 flex-shrink-0" />
//                   {!collapsed && <span>{item.name}</span>}
//                 </NavLink>
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* User Profile */}
//         <div className="border-t p-4">
//           <div className={cn(
//             "flex items-center gap-3",
//             collapsed && "justify-center"
//           )}>
//             <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-600" />
//             {!collapsed && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium truncate">{user?.full_name}</p>
//                 <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LucideIcon,
  List,
  ListCheck,
  FolderCog,
  Banknote,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface SubMenuItem {
  name: string;
  href: string;
}
interface NavigationItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  subItems?: SubMenuItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
   { 
    name: 'Users', 
    icon: User,
    subItems: [
      { name: 'All Users', href: '/dashboard/users' },
      { name: 'Providers', href: '/dashboard/users?user_type=provider' },
      { name: 'Clients', href: '/dashboard/users?user_type=client' },
    ]
  },
  { name: 'Care Provider', href: '/dashboard/job-listing', icon: ListCheck },
  { 
    name: 'Bookings', 
    icon: FolderCog,
    subItems: [
      { name: 'Dashboard', href: '/dashboard/bookings' },
      { name: 'All Bookings', href: '/dashboard/my-bookings' },
    ]
  },
  { 
    name: 'Reviews', 
    icon: FolderCog,
    subItems: [
      { name: 'Dashboard', href: '/dashboard/reviews' },
      { name: 'All Reviews', href: '/dashboard/reviews-all' },
    ]
  },
  { 
    name: 'Messages', 
    icon: FolderCog,
    subItems: [
      { name: 'Dashboard', href: '/dashboard/messages' },
      // { name: 'All Messages', href: '/dashboard/messages-all' },
    ]
  },

  //  { 
  //   name: 'Users', 
  //   icon: User,
  //   subItems: [
  //     { name: 'All Users', href: '/dashboard/users' },
  //     // { name: 'Providers', href: '/dashboard/users?user_type=provider' },
  //     // { name: 'Clients', href: '/dashboard/users?user_type=client' },
  //   ]
  // },
 
  { name: 'Transactions', href: '/dashboard/transactions', icon: Banknote },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['Users']); // Default open Users menu
  const { user } = useAuth();

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isMenuOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Care App
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-muted"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                // Dropdown Menu Item
                <>
                  <button
                    onClick={() => !collapsed && toggleMenu(item.name)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        {isMenuOpen(item.name) 
                          ? <ChevronUp className="h-4 w-4" />
                          : <ChevronDown className="h-4 w-4" />
                        }
                      </>
                    )}
                  </button>

                  {/* Sub Menu Items */}
                  {!collapsed && isMenuOpen(item.name) && (
                    <div className="mt-1 space-y-1 pl-8">
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.href}
                          className={({ isActive }) => {
                            // Check if current URL matches exactly
                            const currentPath = window.location.pathname + window.location.search;
                            const isExactMatch = currentPath === subItem.href;
                            
                            return cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                              isExactMatch && "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                            );
                          }}
                        >
                          <span>{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Regular Menu Item
                <NavLink
                  to={item.href!}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                      isActive && "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
                      collapsed && "justify-center"
                    )
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          <div className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600  flex items-center justify-center text-white text-sm font-semibold">
              {user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}