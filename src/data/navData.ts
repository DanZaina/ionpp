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
      label: "Design & Digital",
      href: "/design-digital",
    } as NavLink,
  },
  {
    type: "link",
    data: {
      label: "Real Estate Signs",
      footerLabel: "Real Estate Signs",
      href: "/real-estate-signs",
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