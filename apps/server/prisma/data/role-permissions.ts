export const ROLE_PERMISSIONS: Record<string, string[]> = {

    SUPER_ADMIN: [
        "*",
    ],

    ADMIN: [

        "user:read",

        "category:create",
        "category:read",
        "category:update",
        "category:delete",

        "brand:create",
        "brand:read",
        "brand:update",
        "brand:delete",

        "product:create",
        "product:read",
        "product:update",
        "product:delete",

        "product-image:create",
        "product-image:read",
        "product-image:update",
        "product-image:delete",

        "product-variant:create",
        "product-variant:read",
        "product-variant:update",
        "product-variant:delete",

        "inventory:create",
        "inventory:read",
        "inventory:update",
        "inventory:delete",

        "warehouse:create",
        "warehouse:read",
        "warehouse:update",
        "warehouse:delete",

        "order:read",
        "order:update",
        "order:cancel",

        "shipment:read",
        "shipment:update-status",

        "payment:read",

        "review:read",
        "review:update",
        "review:delete",

        "analytics:export",

    ],

    MANAGER: [

        "category:read",

        "brand:read",

        "product:create",
        "product:read",
        "product:update",

        "inventory:read",
        "inventory:update",

        "warehouse:read",

        "order:read",

        "shipment:read",

        "review:read",

    ],

    CUSTOMER: [

        "product:read",

        "category:read",

        "brand:read",

        "cart:create",
        "cart:read",
        "cart:update",
        "cart:delete",

        "wishlist:create",
        "wishlist:read",
        "wishlist:update",
        "wishlist:delete",

        "order:create",
        "order:read",
        "order:cancel",

        "review:create",
        "review:read",
        "review:update",

        "payment:create",
        "payment:read",

    ],

    VENDOR: [

        "product:create",
        "product:read",
        "product:update",

        "product-image:create",
        "product-image:read",
        "product-image:update",
        "product-image:delete",

        "product-variant:create",
        "product-variant:read",
        "product-variant:update",
        "product-variant:delete",

        "inventory:read",
        "inventory:update",

        "order:read",

        "analytics:export",

    ],

    DELIVERY_PARTNER: [

        "shipment:read",
        "shipment:update-status",

        "order:read",

    ],

    SUPPORT: [

        "user:read",

        "order:read",

        "shipment:read",

        "review:read",

        "notification:send",

    ],

};