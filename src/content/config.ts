import { defineCollection, z } from "astro:content";

// ── Reusable sub-schemas ────────────────────────────────────────────────────

const checklistItem = z.object({
  text: z.string(),
});

const feature = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageAlt: z.string(),
  imagePosition: z.enum(["left", "right"]),
  image: z.string().optional(),
  buttonLink: z.string().optional(),
  buttonText: z.string().optional(),
  buttonTarget: z.string().optional(),
});

const accordion = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

// Used by InnerServicePage (e.g. booklets-manuals)
const pageSection = z.object({
  type: z.enum(["feature", "centre"]),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imagePosition: z.enum(["left", "right"]).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const featureNavItem = z.object({
  icon: z.string(),
  label: z.string(),
  anchor: z.string(),
});

// ── Collection definition ───────────────────────────────────────────────────

const pages = defineCollection({
  type: "data",
  schema: z.object({
    site: z.object({
      title: z.string(),
      description: z.string(),
    }),

    hero: z.object({
      title: z.string(),
      imageAlt: z.string().optional(),
      bgColor: z.string().optional(),
      image: z.string().optional(),
      description: z.string().optional(),
      ctaText: z.string().optional(),
      ctaHref: z.string().optional(),
    }),

    centreText: z
      .object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
      .optional(),

    // Home page card slider
    cardSlider: z
      .object({
        title: z.string(),
        cards: z.array(
          z.object({
            icon: z.string(),
            name: z.string(),
            description: z.string(),
            link: z.string(),
          })
        ),
      })
      .optional(),

    features: z.array(feature).optional(),

    services: z
      .object({
        checklist: z.array(checklistItem),
      })
      .optional(),

    // Contact page
    contact: z
      .object({
        header: z.string(),
        description: z.string(),
        phone: z.string(),
        email: z.string(),
        address: z.string(),
      })
      .optional(),

    // Home page inline testimonials
    testimonials: z
      .object({
        sectionTitle: z.string(),
        items: z.array(
          z.object({
            content: z.string(),
            author: z.string(),
          })
        ),
      })
      .optional(),

    // Home page inline footer social links
    footer: z
      .object({
        socialLinks: z.array(
          z.object({
            platform: z.string(),
            href: z.string(),
          })
        ),
      })
      .optional(),

    cta: z
      .object({
        heading: z.string(),
        button: z.string(),
        link: z.string(),
        imageAlt: z.string().optional(),
      })
      .optional(),

    installMap: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        center: z.object({ lat: z.number(), lng: z.number() }),
        zoom: z.number(),
        zones: z.array(z.object({
          id: z.string(),
          minKm: z.number(),
          maxKm: z.number(),
          surcharge: z.number(),
          color: z.string(),
        })),
        messages: z.object({
          free: z.string(),
          surcharge: z.string(),
          outside: z.string(),
          outsideSub: z.string(),
        }),
      })
      .optional(),

    accordionHeading: z.string().optional(),
    accordions: z.array(accordion).optional(),

    // 404 page
    content: z
      .object({
        eyebrow: z.string(),
        title: z.string(),
        description: z.string(),
        primaryButton: z.object({ label: z.string(), href: z.string() }),
        secondaryButton: z.object({ label: z.string(), href: z.string() }),
      })
      .optional(),

    // InnerServicePage (booklets, sub-pages)
    featureNav: z.array(featureNavItem).optional(),
    sections: z.array(pageSection).optional(),
  }),
});

// ── Global collections ──────────────────────────────────────────────────────

const footer = defineCollection({
  type: "data",
  schema: z.object({
    logo: z.object({ alt: z.string() }),
    contact: z.object({
      locations: z.array(
        z.object({
          name: z.string(),
          address: z.string(),
          phone: z.object({ number: z.string(), href: z.string() }),
          email: z
            .object({ address: z.string(), href: z.string() })
            .optional(),
        })
      ),
    }),
    hours: z.array(z.object({ days: z.string(), time: z.string() })),
    copyright: z.object({ text: z.string() }),
  }),
});

const logoSlider = defineCollection({
  type: "data",
  schema: z.object({
    logoSlider: z.object({
      animationDuration: z.object({
        desktop: z.string(),
        mobile: z.string(),
      }),
      logos: z.array(
        z.object({
          id: z.string(),
          file: z.string(),
          alt: z.string(),
        })
      ),
    }),
  }),
});

const social = defineCollection({
  type: "data",
  schema: z.object({
    socialIcons: z.array(
      z.object({
        href: z.string(),
        icon: z.string(),
      })
    ),
  }),
});

const testimonials = defineCollection({
  type: "data",
  schema: z.object({
    testimonials: z.object({
      sectionTitle: z.string(),
      maxChars: z.number(),
      items: z.array(
        z.object({
          id: z.string(),
          content: z.string(),
          author: z.string(),
        })
      ),
    }),
  }),
});

export const collections = { pages, footer, logoSlider, social, testimonials };
