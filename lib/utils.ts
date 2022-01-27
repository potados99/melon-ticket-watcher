export function interceptParameter(functionName: string, callString: string): any {
  const holder = {param: null};

  eval(`function ${functionName}(param) {
    holder.param = param;
  }

  ${callString}`);

  return holder.param;
}
