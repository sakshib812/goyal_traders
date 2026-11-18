/**
 * Goyal Traders - Public Partner-Acquisition Site Content & Placeholders Config
 * Single Source of Truth for all copy, role definitions, steps, checklist, FAQ and placeholders.
 */

(function () {
  'use strict';

  var content = {
    brand: {
      name: "GOYAL TRADERS",
      tagline: "B2B digital payments for retailers & distributors",
      metaTitle: "Goyal Traders | B2B Partner Network - Recharge, Bills & Insurance",
      metaDescription: "Become a Goyal Traders partner. Offer mobile & DTH recharge, electricity & bill payments, utility & fees, and insurance premiums from your shop or distribution network."
    },

    // Placeholders required by prompt (marked with [PLACEHOLDER])
    placeholders: {
      whitelabelButtonLabel: "Enquire", // [CONFIRM: if Goyal Traders does not offer Whitelabel publicly, label button "Enquire" instead of "Apply"]
      whitelabelButtonAction: "Whitelabel Partnership",
      activationTime: "1 to 2 working days after verification", // [Typical activation time: X working days after verification]
      gstRequirement: "GST registration (if applicable) [CONFIRM per role]",
      faq1Eligibility: "Subject to business verification and regional availability. [CONFIRM eligibility]",
      faq4JoiningFee: "There are no hidden application fees. Any role-specific security deposit or wallet minimums are shared transparently upfront before you start. [CONFIRM: joining or registration fee details]",
      faq5WalletTopup: "Wallet balance can be topped up through instant UPI, IMPS/NEFT bank transfer, or via your mapped distributor. [CONFIRM: wallet top-up methods]",
      faq6ActivationTime: "Activation typically takes 24 to 48 hours once your KYC documents are reviewed and approved. [CONFIRM: typical time]",
      faq8RetailerGrowth: "Yes. High-performing retailers with solid transaction volumes and local presence can be promoted to area distributors. [CONFIRM]"
    },

    // Hero Section Copy
    hero: {
      pillTag: "Recharge · Bill Payments · Insurance",
      headingMain: "Powering businesses with",
      headingAccent: "seamless financial services.",
      leadText: "Goyal Traders brings recharge, bill payments, digital verification and banking services together through a unified platform, helping businesses simplify service delivery and expand their digital offerings.",
      ctaPrimary: "Explore Our Services",
      ctaSecondary: "Become a Partner",
      trustChips: [
        { label: "Recharge & bill payments", icon: "zap" },
        { label: "Insurance premiums", icon: "shield" },
        { label: "Growing partner network", icon: "users" }
      ]
    },

    // Why Partner With Us Section (6 minimal tiles)
    whyPartner: {
      eyebrow: "WHY GOYAL TRADERS",
      title: "Everything a partner needs, in one place",
      subtitle: "Add more services to your counter or network without managing many different providers.",
      tiles: [
        {
          id: "layers",
          icon: "layers",
          title: "Many Services, One Platform",
          desc: "Recharges, bill payments and insurance premiums from a single login."
        },
        {
          id: "badge-percent",
          icon: "badge-percent",
          title: "Commission On Every Transaction",
          desc: "Earn on each completed transaction. Plans are shared during onboarding."
        },
        {
          id: "wallet",
          icon: "wallet",
          title: "Simple Wallet-Based Working",
          desc: "Top up your wallet and serve customers instantly."
        },
        {
          id: "file-check",
          icon: "file-check",
          title: "Easy Digital Onboarding",
          desc: "Share your details and KYC documents online, with guidance from our team."
        },
        {
          id: "bar-chart",
          icon: "bar-chart-3",
          title: "Clear Reports",
          desc: "See your transactions, commissions and balances in your dashboard."
        },
        {
          id: "headset",
          icon: "headset",
          title: "Support When You Need It",
          desc: "A dedicated team to help with onboarding, queries and failed transactions."
        }
      ]
    },

    // Roles & Hierarchy Section
    roles: {
      eyebrow: "PARTNER NETWORK",
      title: "Roles & Hierarchy",
      subtitle: "Our network is organised in clear levels, each with its own dashboard, permissions and earning model, so everyone knows what they handle and what they earn.",
      footnote: "Which roles are open for new partners may vary by region. Talk to our team to find the right fit.",
      cards: [
        {
          id: "whitelabel",
          title: "Whitelabel",
          tag: "Top-level partner",
          icon: "crown",
          description: "Runs the services under its own brand. Builds the network below it, chooses which services are switched on and sets the commission plan for every level.",
          bullets: [
            "Launch services under your own brand",
            "Create and manage master distributors, distributors and retailers",
            "Control active services and commissions"
          ],
          ctaLabel: "Enquire as Whitelabel", // Using the [CONFIRM] placeholder logic
          interestValue: "Whitelabel"
        },
        {
          id: "master-distributor",
          title: "Master Distributor",
          tag: "Network builder",
          icon: "network",
          description: "Appoints and supports distributors and retailers across a wider region, keeps their wallets funded and watches how the whole network performs.",
          bullets: [
            "Onboard distributors and retailers",
            "Manage commissions and wallet balances",
            "Track network-wide performance"
          ],
          ctaLabel: "Apply as Master Distributor",
          interestValue: "Master Distributor"
        },
        {
          id: "distributor",
          title: "Distributor",
          tag: "Area partner",
          icon: "users",
          description: "Brings local shops onto the platform, enables the right services for them and supports them day to day. Earns on the transactions of the retailers in the area.",
          bullets: [
            "Onboard and train retailers",
            "Assign services and pricing to retailers",
            "Top up retailer wallets and view area reports"
          ],
          ctaLabel: "Apply as Distributor",
          interestValue: "Distributor"
        },
        {
          id: "retailer",
          title: "Retailer / Agent",
          tag: "Counter partner",
          icon: "store",
          description: "Serves walk-in customers at the shop for recharges, bill payments and insurance premiums, and earns a commission on each completed transaction.",
          bullets: [
            "Recharge mobiles and DTH",
            "Collect electricity, utility and fee payments",
            "Earn commission and view your transaction history"
          ],
          ctaLabel: "Apply as Retailer",
          interestValue: "Retailer"
        }
      ]
    },

    // How We Work Section (4 Steps)
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      title: "Become a partner in four simple steps",
      subtitle: "From your first call to your first transaction, we guide you through every step.",
      steps: [
        {
          number: "01",
          title: "Get in touch",
          text: "Fill in the callback form or call us. Tell us your location, your business and the role you are interested in."
        },
        {
          number: "02",
          title: "Submit your documents",
          text: "Share your KYC documents digitally. Our team checks them and helps if anything is missing."
        },
        {
          number: "03",
          title: "Get activated",
          text: "Once verified, your account is activated, your wallet is set up and the services for your role are switched on. [Typical activation time: 1 to 2 working days after verification]"
        },
        {
          number: "04",
          title: "Start earning",
          text: "Serve customers or onboard your network, and track every transaction and commission from your dashboard."
        }
      ],
      ctaLabel: "Request a Callback"
    },

    // Documents Checklist Section
    documents: {
      title: "Documents you will need",
      subtitle: "Keep these ready for a smooth onboarding.",
      items: [
        "Aadhaar card (mobile number linked to Aadhaar)",
        "PAN card",
        "Recent passport-size photograph",
        "Photograph of your shop or business premises",
        "GST registration (if applicable) [CONFIRM per role]"
      ],
      tips: [
        "Use clear, original documents",
        "Blurry or edited images may be rejected",
        "Details must match across documents"
      ],
      note: "Requirements can differ by role. Our team will confirm the exact list when you apply."
    },

    // FAQ Section
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Who can become a Goyal Traders partner?",
          a: "Shop owners, local businesses and entrepreneurs who want to offer recharge, bill payment and insurance services can apply as a retailer. Larger businesses can explore distributor, master distributor or whitelabel roles. [CONFIRM eligibility: Subject to business verification and regional availability.]"
        },
        {
          q: "Which services can I offer to my customers?",
          a: "Mobile and DTH recharges, electricity and other bill payments, utility and fee payments such as FASTag, gas, water and school fees, and insurance premium payments."
        },
        {
          q: "How do I earn?",
          a: "Partners earn a commission on completed transactions. Distributors and above also earn from the activity of the network they build. Commission plans are shared during onboarding."
        },
        {
          q: "Is there a joining fee?",
          a: "There are no hidden application fees. Any role-specific security deposit or wallet minimums are shared transparently upfront before you start. [CONFIRM: joining or registration fee details]"
        },
        {
          q: "How do I add balance to my wallet?",
          a: "Wallet balance can be added through instant UPI, IMPS/NEFT bank transfer, or via your mapped distributor. [CONFIRM: wallet top-up methods]"
        },
        {
          q: "How long does activation take?",
          a: "Activation happens after your documents are verified. [CONFIRM: typical time: 24 to 48 hours once verified]"
        },
        {
          q: "What happens if a transaction fails?",
          a: "Failed transactions are handled as described in our Refund Policy, and our support team can help you track them.",
          linkText: "View our Refund Policy",
          linkUrl: "#/refund-policy"
        },
        {
          q: "Can a retailer grow into a distributor?",
          a: "Yes. Active retailers with consistent transaction volume and strong local reach can be upgraded to area distributors. Talk to our team about growth options as your business expands. [CONFIRM]"
        }
      ]
    },

    // Partner Ticker / Marquee Section (Auto-scrolling pill chips)
    serviceOrbit: {
      innerRing: [
        { name: "Mobile Recharge", icon: "smartphone" },
        { name: "Bill Payments", icon: "receipt" },
        { name: "Insurance", icon: "shield-check" },
        { name: "Wallet", icon: "wallet" }
      ],
      outerRing: [
        { name: "DTH", icon: "tv" },
        { name: "Electricity", icon: "zap" },
        { name: "FASTag", icon: "car" },
        { name: "Gas & Water", icon: "droplets" },
        { name: "School Fees", icon: "graduation-cap" },
        { name: "Broadband", icon: "wifi" }
      ]
    },
        // Bill Payments Section (Between Services & Why Us)
    billPayments: {
      "tagPill": "BILL PAYMENTS",
      "heading": "Collect every bill from a single counter",
      "paragraph": "Let customers pay their everyday bills at your shop. Fetch the bill, take the payment and hand over a receipt in moments, while you earn a commission on every completed transaction.",
      "bullets": [
            "Fetch the bill details before you collect payment",
            "Instant status and a printable receipt",
            "Paid from your Goyal Traders wallet"
      ],
      "ctaButton": {
            "label": "Start Collecting Payments",
            "target": "hero"
      },
      "tiles": [
            {
                  "id": "electricity",
                  "label": "Electricity",
                  "icon": "zap",
                  "row": 0,
                  "col": 0
            },
            {
                  "id": "water",
                  "label": "Water",
                  "icon": "droplets",
                  "row": 0,
                  "col": 1
            },
            {
                  "id": "gas",
                  "label": "Gas",
                  "icon": "flame",
                  "row": 0,
                  "col": 2
            },
            {
                  "id": "lpg-gas",
                  "label": "LPG Gas",
                  "icon": "cylinder",
                  "row": 0,
                  "col": 3
            },
            {
                  "id": "mobile-prepaid",
                  "label": "Mobile Prepaid",
                  "icon": "smartphone",
                  "row": 1,
                  "col": 0
            },
            {
                  "id": "mobile-postpaid",
                  "label": "Mobile Postpaid",
                  "icon": "smartphone-nfc",
                  "row": 1,
                  "col": 1
            },
            {
                  "id": "dth",
                  "label": "DTH",
                  "icon": "tv",
                  "row": 1,
                  "col": 2
            },
            {
                  "id": "cable-tv",
                  "label": "Cable TV",
                  "icon": "tv-minimal",
                  "row": 1,
                  "col": 3
            },
            {
                  "id": "broadband",
                  "label": "Broadband",
                  "icon": "wifi",
                  "row": 2,
                  "col": 0
            },
            {
                  "id": "landline-postpaid",
                  "label": "Landline Postpaid",
                  "icon": "phone",
                  "row": 2,
                  "col": 1
            },
            {
                  "id": "fastag",
                  "label": "FASTag",
                  "icon": "car",
                  "row": 2,
                  "col": 2
            },
            {
                  "id": "municipal-taxes",
                  "label": "Municipal Taxes",
                  "icon": "landmark",
                  "row": 2,
                  "col": 3
            },
            {
                  "id": "municipal-services",
                  "label": "Municipal Services",
                  "icon": "building-2",
                  "row": 3,
                  "col": 0
            },
            {
                  "id": "education-fees",
                  "label": "Education Fees",
                  "icon": "graduation-cap",
                  "row": 3,
                  "col": 1
            },
            {
                  "id": "school-fees",
                  "label": "School Fees",
                  "icon": "school",
                  "row": 3,
                  "col": 2
            },
            {
                  "id": "life-insurance",
                  "label": "Life Insurance",
                  "icon": "heart-pulse",
                  "row": 3,
                  "col": 3
            },
            {
                  "id": "health-insurance",
                  "label": "Health Insurance",
                  "icon": "stethoscope",
                  "row": 4,
                  "col": 0
            },
            {
                  "id": "general-insurance",
                  "label": "General Insurance",
                  "icon": "shield-check",
                  "row": 4,
                  "col": 1
            },
            {
                  "id": "insurance-renewals",
                  "label": "Insurance Renewals",
                  "icon": "refresh-cw",
                  "row": 4,
                  "col": 2
            },
            {
                  "id": "wallet-topup",
                  "label": "Wallet Top-up",
                  "icon": "wallet",
                  "row": 4,
                  "col": 3
            }
      ],
      "optionalTiles": [
            {
                  "id": "credit-card",
                  "label": "Credit Card",
                  "icon": "credit-card",
                  "enabled": false
            },
            {
                  "id": "loan-repayment",
                  "label": "Loan Repayment",
                  "icon": "banknote",
                  "enabled": false
            },
            {
                  "id": "housing-society",
                  "label": "Housing Society",
                  "icon": "home",
                  "enabled": false
            },
            {
                  "id": "rental",
                  "label": "Rental",
                  "icon": "key",
                  "enabled": false
            }
      ]
    },

    // Floating Statistics Panel Configuration
    stats: {
      items: [
        {
          id: "core-services",
          enabled: true,
          icon: "layers",
          number: 6,
          suffix: "",
          label: "Core services",
          text: "Recharge, DTH, bills, utilities, insurance and partner support."
        },
        {
          id: "bill-types",
          enabled: true,
          icon: "receipt",
          number: 20, // Kept in sync with billPayments.tiles.length
          suffix: "+",
          label: "Bill & recharge types",
          text: "Electricity, water, gas, telecom, FASTag, fees and more."
        },
        {
          id: "partner-roles",
          enabled: true,
          icon: "network",
          number: 4,
          suffix: "",
          label: "Partner roles",
          text: "Whitelabel, master distributor, distributor and retailer."
        },
        {
          id: "wallet",
          enabled: true,
          icon: "wallet",
          number: 1,
          suffix: "",
          label: "Wallet",
          text: "A single balance to serve every service."
        },
        // Optional items, disabled by default until verified figures are confirmed [CONFIRM]
        {
          id: "partners-onboarded",
          enabled: false,
          icon: "users",
          number: 0,
          suffix: "+",
          label: "Partners onboarded",
          text: "Active retail and distribution network. [CONFIRM: verified partner count]",
          confirmRequired: true
        },
        {
          id: "transactions-processed",
          enabled: false,
          icon: "activity",
          number: 0,
          suffix: "K+",
          label: "Transactions processed",
          text: "Monthly utility, recharge and bill requests. [CONFIRM: verified transaction volume]",
          confirmRequired: true
        },
        {
          id: "states-covered",
          enabled: false,
          icon: "map-pin",
          number: 0,
          suffix: "+",
          label: "States covered",
          text: "Regional distribution reach. [CONFIRM: verified list of states]",
          confirmRequired: true
        },
        {
          id: "years-in-business",
          enabled: false,
          icon: "calendar",
          number: 0,
          suffix: "+",
          label: "Years in business",
          text: "Serving businesses and retail partners. [CONFIRM: year of establishment]",
          confirmRequired: true
        },
        {
          id: "support-availability",
          enabled: false,
          icon: "clock",
          text: "Mon-Sat, 10 AM - 6 PM",
          label: "Support availability",
          description: "Dedicated support desk for partners. [CONFIRM: exact operating hours]",
          confirmRequired: true
        }
      ]
    },
    partnerTicker: {
      row1: {
        label: "WHO CAN PARTNER WITH US",
        chips: [
          "Retail Shops",
          "Kirana & General Stores",
          "Mobile Recharge Shops",
          "Telecom Retailers",
          "Cyber Cafes",
          "Common Service Centres",
          "Stationery & Photocopy Shops",
          "Medical & Pharmacy Stores",
          "Mobile Accessory Stores",
          "Insurance Advisors",
          "Local Distributors",
          "Master Distributors",
          "Whitelabel Partners",
          "Small Business Owners",
          "Local Entrepreneurs"
        ]
      },
      row2: {
        label: "SERVICES YOU CAN OFFER YOUR CUSTOMERS",
        chips: [
          "Mobile Recharge",
          "DTH Recharge",
          "Electricity Bills",
          "Broadband Bills",
          "Postpaid Bills",
          "FASTag Recharge",
          "Gas Bills",
          "Water Bills",
          "Municipal Payments",
          "School Fee Payments",
          "Insurance Premiums",
          "Policy Renewals",
          "Wallet Top-up",
          "Partner Support"
        ]
      }
    },
    // Final CTA Band
    finalCta: {
      heading: "Ready to grow with Goyal Traders?",
      text: "Tell us about your business and our team will call you back to guide you through the next steps.",
      ctaLabel: "Request a Callback"
    },
    corporateAddress: {
      label: "CORPORATE ADDRESS",
      company: "Goyal Traders",
      street: "Ram Bagh Road, Anaj Mandi Road",
      city: "Barnala",
      district: "Barnala",
      state: "Punjab",
      pincode: "148101",
      full: "Goyal Traders, Ram Bagh Road, Anaj Mandi Road, Barnala, Punjab - 148101"
    }
  };

  // Expose globally and as AngularJS constant if available
  if (typeof window !== 'undefined') {
    window.SITE_CONTENT = content;
  }
  if (typeof angular !== 'undefined') {
    try {
      angular.module('paisaraApp').constant('SITE_CONTENT', content);
    } catch (e) {
      // module will attach when loaded
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = content;
  }
})();

