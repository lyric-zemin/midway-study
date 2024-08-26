export function resSuccess<T>(data: T, message = 'success') {
  return {
    code: 0,
    message,
    data,
  };
}

export function resError(code: number, message: string) {
  return {
    code,
    message,
    data: null,
  };
}
