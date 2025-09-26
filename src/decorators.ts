/**
 * Method Decorator: Logged Method
 */
function loggedMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  return function log(this: any, ...args: any[]) {
    console.log({
      methodName,
      this: this,
      args: args,
    });

    const result = originalMethod.apply(this, args);
    console.log(`${methodName}(${JSON.stringify(args)}) => ${JSON.stringify(result)}`);
    return result;
  };
}

export { loggedMethod };
