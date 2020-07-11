export const LOGIN = "LOGIN"
export function login(result) {
    console.log(result);
    return { type: LOGIN, result }
}