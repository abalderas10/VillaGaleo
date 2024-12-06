import React from 'react';
import { Sailboat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export function Navigation() {
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
                <NavigationMenuTrigger className="text-white/90">
                  Experience
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/experience"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-caribbean-500/50 to-caribbean-600/50 p-6 no-underline outline-none focus:shadow-md hover:bg-gradient-to-b hover:from-caribbean-600/50 hover:to-caribbean-700/50 transition-colors"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-caribbean-900">
                            Discover Paradise
                          </div>
                          <p className="text-sm leading-tight text-caribbean-700">
                            Explore our curated collection of Caribbean adventures and experiences.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#villa"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-caribbean-50"
                        >
                          <div className="text-sm font-medium leading-none text-caribbean-900">The Villa</div>
                          <p className="line-clamp-2 text-sm leading-snug text-caribbean-700">
                            Luxury beachfront accommodation with premium amenities
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="#boat"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-caribbean-50"
                        >
                          <div className="text-sm font-medium leading-none text-caribbean-900">The Boat</div>
                          <p className="line-clamp-2 text-sm leading-snug text-caribbean-700">
                            Exclusive yacht adventures in Caribbean waters
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Book Now Button */}
          <button className={cn(
            "px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full",
            "text-caribbean-900 text-sm font-medium",
            "hover:bg-white transition-all duration-300",
            "shadow-lg hover:shadow-xl",
            "transform hover:-translate-y-0.5"
          )}>
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}