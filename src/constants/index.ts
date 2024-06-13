type Response = {
    message: string,
    success: boolean
}

const INTERNAL_SERVER_ERROR: Response = { message: "Internal server error!", success: false };
const STORE_NOT_FOUND: Response = { message: "Store not found!", success: false };
const INVALID_STORE_KEY: Response = { message: "Invalid store key!", success: false };

export { INTERNAL_SERVER_ERROR, STORE_NOT_FOUND, INVALID_STORE_KEY }