
export const isObjectInArray =
  (iter, testObj) =>
    console.log({ testObj }) ||
    Object.keys(iter).some(
      key =>
        iter[key][testObj.key] ? iter[key][testObj.key] : false
    ).length > 0;
