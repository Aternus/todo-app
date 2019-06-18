/**
 * Method Decorator: Log
 *
 * @param {Object} target - The object that the member lives on (instance).
 * @param {string} methodName - The name of the method to be decorated.
 * @param {PropertyDescriptor} descriptor - An object that contains all the metadata
 *                                          for the method you're looking to modify.
 */
function log(target: Object, methodName: string, descriptor: PropertyDescriptor) {
  // console.log(target);
  // console.log(methodName);
  // console.log(descriptor);

  const fn = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const result = fn.apply(this, args);
    console.log(`${methodName}(${JSON.stringify(args)}) => ${JSON.stringify(result)}`);
    return result;
  };
}

export { log };
