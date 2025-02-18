const validateParamsId = (id:string | undefined) => {
    if (!id) {return false}
    const numericId = Number(id)
    if (isNaN(numericId)) {return false}
    else {return numericId}
}

export default validateParamsId