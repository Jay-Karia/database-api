import { v4 as uuidv4 } from 'uuid';

const genStoreKey = () => {
    const storeKey = uuidv4()
    return storeKey
}

export default genStoreKey