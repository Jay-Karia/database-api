import db from "../db"

const getStore = async (storeId: string) => {
    const store = await db.store.findUnique({
        where: {
            id: storeId
        },
        include: {
            data: true
        }
    })

    return store;
}

export default getStore;