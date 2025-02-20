
const getIdOfLastListItem = <T extends {id: number|string}> (list: T[]) => {
    const lastIndex = list.length - 1;
    return Number(list[lastIndex].id)
}

export default getIdOfLastListItem