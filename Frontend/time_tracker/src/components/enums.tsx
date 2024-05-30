export enum APIEndpoints {
    base = "http://127.0.0.1:8000/api",

    logout = base + "/auth/logout",
    user_create = base + "/user/create",
    login = base + "/auth/login",
    create_note = base + "/note/create"
}
export enum frontURLs {
    base = "http://127.0.0.1:3000",
    sign_up = "/sign_up",
    login = "/login",

    note = "/note"
}