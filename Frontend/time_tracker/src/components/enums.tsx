export enum APIEndpoints {
    base = "http://127.0.0.1:8000/api",

    logout = base + "/auth/logout",
    user_create = base + "/user/create",
    login = base + "/auth/login",

    note_read = base + "/note/read",
    note_create = base + "/note/create",

    subject_read = base + "/subject/read",
    subject_read_by_title = base + "/subject/read_by_title",
    subject_create = base + "/subject/create",
    subject_update = base + "/subject/patch",
    
    topic_read = base + "/topic/read",
    topic_create = base + "/topic/create",

    period_read = base + "/period/read",
    period_create = base + "/period/create"
}
export enum frontURLs {
    base = "http://127.0.0.1:3000",
    sign_up = "/sign_up",
    login = "/login",

    note = "/note",
    subject = "/subject",
    topic = "/topic",
    period = "/period",

    single_subject = "/subject/:title"
}