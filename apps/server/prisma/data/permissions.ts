const RESOURCES = [
    "user",
    "role",
    "permission",

    "category",
    "brand",
    "product",
    "product-image",
    "product-variant",
    "inventory",
    "warehouse",

    "cart",
    "wishlist",

    "order",
    "shipment",
    "delivery-partner",

    "payment",
    "refund",

    "review",

    "notification",

    "analytics",

    "settings",
] as const;

const CRUD_ACTIONS = [
    "create",
    "read",
    "update",
    "delete",
] as const;

const EXTRA_PERMISSIONS = [

    "order:cancel",
    "order:refund",

    "shipment:update-status",

    "payment:refund",

    "notification:send",

    "analytics:export",

    "settings:update",

] as const;

function toDisplayName(
    resource: string,
    action: string,
): string {

    return `${action.charAt(0).toUpperCase()}${action.slice(1)} ${resource
        .replaceAll("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}`;

}

export const PERMISSIONS = [

    ...RESOURCES.flatMap((resource) =>

        CRUD_ACTIONS.map((action) => ({

            code: `${resource}:${action}`,

            displayName: toDisplayName(resource, action),

            description: `${action} ${resource}`,

            isSystem: true,

        })),

    ),

    ...EXTRA_PERMISSIONS.map((code) => {

        const [resource, action] = code.split(":") as [string, string];

        return {

            code,

            displayName: toDisplayName(resource, action),

            description: code,

            isSystem: true,
        };

    }),

] as const;