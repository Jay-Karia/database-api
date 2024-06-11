import db from "../db"

const getData = async (dataId: string) => {

    const data = await db.data.findUnique({
        where: {
            id: dataId
        },
        include: {
            store: true
        }
    })

    return data
}

export default getData