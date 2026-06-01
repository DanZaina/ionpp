export interface NavLink {
  label: string;
  href: string;
  footerLabel?: string;
}

export interface NavDropdown {
  label: string;
  href: string; // Used by the footer only; the header trigger is a button.
  footerLabel?: string;
  children: NavLink[];
}

export interface NavItem {
  type: "link" | "dropdown";
  data: NavLink | NavDropdown;
}

export interface FooterLink {
  label: string;
  href: string;
}

// ===========================================
// NAVIGATION DATA
// ===========================================

export const navigationItems: NavItem[] = [
  // TODO: restore dropdown when sub-pages are ready
  // {
  //   type: "dropdown",
  //   data: {
  //     label: "Printing",
  //     footerLabel: "Printing Services",
  //     href: "printing",
  //     children: [
  //       { label: "Real Estate Signs", href: "printing" },
  //       { label: "Flyers",            href: "/services/signs" },
  //       { label: "Posters",           href: "/services/printing/posters" },
  //       { label: "Banners",           href: "/services/printing/banners" },
  //       { label: "Stickers & Labels", href: "/services/printing/stickers" },
  //     ],
  //   } as NavDropdown,
  // },
  {
    type: "link",
    data: {
      label: "Printing",
      footerLabel: "Printing Services",
      href: "/printing",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Signs",
      footerLabel: "Sign Services",
      href: "/signs",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Promo",
      footerLabel: "Promotional Products",
      href: "/promo-products",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Design & Web",
      href: "/design-digital",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Contact",
      href: "/contact",
    } as NavLink,
  },
];

// ===========================================
// HELPERS
// ===========================================

export function getNavItems(): NavItem[] {
  return navigationItems;
}

/**
 * Flat list for the footer: one entry per top-level item. Dropdowns collapse
 * to their parent `href`; children are not listed in the footer.
 */
export function getFooterLinks(): FooterLink[] {
  return navigationItems.map((item) => {
    const data = item.data as NavLink | NavDropdown;
    return {
      label: data.footerLabel || data.label,
      href: data.href,
    };
  });
}