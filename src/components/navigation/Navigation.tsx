import React from 'react';
import { Sailboat, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { BookingDialog } from '../booking/BookingDialog';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu';

const experiences = [
  {
    title: "The Villa",
    href: "#villa",
    description: "Luxury beachfront accommodation with premium amenities"
  },
  {
    title: "The Boat",
    href: "#boat",
    description: "Exclusive yacht adventures in Caribbean waters"
  },
  {
    title: "Activities",
    href: "/experience",
    description: "Discover our curated collection of Caribbean adventures"
  }
];

export function Navigation() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-white group">
          <Sailboat className="w-8 h-8 transform group-hover:-translate-y-1 transition-transform duration-300" />
          <span className="text-xl font-display font-medium tracking-wide group-hover:text-caribbean-200 transition-colors">
            VillaGaleon
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/90 hover:text-white">
                  Experience
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {experiences.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-caribbean-50"
                          >
                            <div className="text-sm font-medium leading-none text-caribbean-900">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-caribbean-700">
                              {item.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <button 
            onClick={() => setIsBookingOpen(true)}
            className={cn(
              "px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full",
              "text-caribbean-900 text-sm font-medium",
              "hover:bg-white transition-all duration-300",
              "shadow-lg hover:shadow-xl",
              "transform hover:-translate-y-0.5",
              "flex items-center gap-2"
            )}
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>

          <BookingDialog 
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}