export function interceptParameter(functionName: string, callString: string): any {
  const holder = {param: null};

  eval(`function ${functionName}(param) {
    holder.param = param;
  }

  ${callString}`);

  return holder.param;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
