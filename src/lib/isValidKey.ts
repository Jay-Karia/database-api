import bcryptjs from 'bcryptjs'

const isValidKey = async (storeKey: string, hashed: string) => {
    return bcryptjs.compareSync(storeKey, hashed)
}

export default isValidKey