export const ROLES = [

    {
        name: "SUPER_ADMIN",
        displayName: "Super Administrator",
        description: "Full system access.",
        isSystem: true,
    },

    {
        name: "ADMIN",
        displayName: "Administrator",
        description: "Administrative access.",
        isSystem: true,
    },

    {
        name: "MANAGER",
        displayName: "Manager",
        description: "Operational management.",
        isSystem: true,
    },

    {
        name: "CUSTOMER",
        displayName: "Customer",
        description: "Customer account.",
        isSystem: true,
    },

    {
        name: "VENDOR",
        displayName: "Vendor",
        description: "Vendor account.",
        isSystem: true,
    },

    {
        name: "DELIVERY_PARTNER",
        displayName: "Delivery Partner",
        description: "Delivery partner.",
        isSystem: true,
    },

    {
        name: "SUPPORT",
        displayName: "Support",
        description: "Customer support.",
        isSystem: true,
    },

] as const;