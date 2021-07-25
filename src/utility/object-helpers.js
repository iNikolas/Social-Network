export const mappingTemplate = (origArr, arrIdentifier, condition, newData) => {

    return origArr.map(u => {
        if (u[arrIdentifier] === condition) {
            newData = newData()
            return {
                ...u, ...newData
//                followed: type === 'follow' ? true : false
            }
        } else {
            return u
        }
    })

}
