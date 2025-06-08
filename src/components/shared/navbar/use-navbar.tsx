import { MenuItem } from "./types";
import { ReactNode } from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SubMenuLink } from "./components/sub-menu-link";

interface NavbarHooks {
  renderMenuItem: (item: MenuItem) => ReactNode;
  renderMobileMenuItem: (item: MenuItem) => ReactNode;
}

export const useNavbar = (): NavbarHooks => {
  const renderMenuItem = (item: MenuItem): ReactNode => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title} className="w-80">
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          href={item.url}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem): ReactNode => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <a key={item.title} href={item.url} className="text-md font-semibold">
        {item.title}
      </a>
    );
  };

  return {
    renderMenuItem,
    renderMobileMenuItem,
  };
}; 