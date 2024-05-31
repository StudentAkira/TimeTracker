export enum APIEndpoints {
    base = "http://127.0.0.1:8000/api",

    logout = base + "/auth/logout",
    user_create = base + "/user/create",
    login = base + "/auth/login",

    note_read = base + "/note/read",
    note_read_by_title = base + "/note/read_by_title",
    note_create = base + "/note/create",
    note_update = base + "/note/patch",
    note_delete = base + "/note/delete",

    subject_read = base + "/subject/read",
    subject_read_by_title = base + "/subject/read_by_title",
    subject_create = base + "/subject/create",
    subject_update = base + "/subject/patch",
    append_topic_to_subject = base + "/subject/append_topic",
    remove_topic_from_subject = base + "/subject/remove_topic",
    subject_delete = base + "/subject/delete",
    
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

    single_subject = "/subject/:title",
    single_note = "/note/:title"
}