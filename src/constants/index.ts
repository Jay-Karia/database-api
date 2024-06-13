const INTERNAL_SERVER_ERROR: { message: string, success: boolean } = { message: "Internal server error!", success: false };
const STORE_NOT_FOUND: { message: string, success: boolean } = { message: "Store not found!", success: false };
const INVALID_STORE_KEY: { message: string, success: boolean } = { message: "Invalid store key!", success: false };

export { INTERNAL_SERVER_ERROR, STORE_NOT_FOUND, INVALID_STORE_KEY }