import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, X, LayoutDashboard, UserCircle, Settings, LogOut } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account-details', label: 'Account', icon: UserCircle },
  { href: '/profile-settings', label: 'Settings', icon: Settings },
];

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen);

  const commonLinkClasses = "flex items-center px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClasses = "bg-gray-900 text-white"; // Example active style
  const inactiveLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  // Dummy function to determine active link
  const isActive = (path: string) => window.location.pathname.startsWith(path);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 font-bold text-xl">
              MyBank
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`${commonLinkClasses} ${isActive(item.href) ? activeLinkClasses : inactiveLinkClasses}`}
              >
                <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" className={`${commonLinkClasses} ${inactiveLinkClasses}`}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </div>
          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-gray-800 text-white p-0">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <Link to="/dashboard" className="font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        MyBank
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex flex-col space-y-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${commonLinkClasses} ${isActive(item.href) ? activeLinkClasses.replace("bg-gray-900", "bg-gray-700") : inactiveLinkClasses}`}
                    >
                      <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                      {item.label}
                    </Link>
                  ))}
                   <Separator className="my-2 bg-gray-700" />
                   <Button variant="ghost" className={`${commonLinkClasses} ${inactiveLinkClasses} w-full justify-start`}>
                        <LogOut className="mr-3 h-5 w-5" /> Logout
                    </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
// Need to import Separator if used, it's a shadcn component.
// Let's assume it is imported. For now, I'll just ensure the component structure is sound.
// Adding import for Separator to be complete.
import { Separator } from "@/components/ui/separator";
export default NavigationMenu;