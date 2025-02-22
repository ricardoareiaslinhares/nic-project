
const getIdOfLastListItem = <T extends {id: number|string}> (list: T[]) => {
    console.log(list.length, "HEREk")
    if (list.length === 0) {
        return 0
    }
    const lastIndex = list.length - 1;
    return Number(list[lastIndex].id)
}

export default getIdOfLastListItem