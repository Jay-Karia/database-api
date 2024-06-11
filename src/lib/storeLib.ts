import db from "../db"
import { v4 as uuidv4 } from 'uuid';

const checkDuplicateName = async (name: string) => {

    const store = await db.store.findFirst({
        where: {
            name
        }
    })
    if (store) {
        return true
    }
    return false
}

const genStoreKey = () => {
    const storeKey = uuidv4()
    return storeKey
}

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

export { checkDuplicateName, genStoreKey, getStore }