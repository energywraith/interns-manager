export function splitIntoChunks<Object = {}>(users: Object[], perPage: number) {
  return users?.reduce((resultArray: Object[][], item, index) => {
    const chunkIndex = Math.floor(index / perPage)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
