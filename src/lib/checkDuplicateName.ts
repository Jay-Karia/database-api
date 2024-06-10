import db from "../db"

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

export default checkDuplicateName