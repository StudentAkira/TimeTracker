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
    note_read_by_title_starts_witn = base + "/note/read_by_title_starts_with",

    subject_read = base + "/subject/read",
    subject_read_by_title = base + "/subject/read_by_title",
    subject_create = base + "/subject/create",
    subject_update = base + "/subject/patch",
    append_topic_to_subject = base + "/subject/append_topic",
    remove_topic_from_subject = base + "/subject/remove_topic",
    subject_delete = base + "/subject/delete",
    
    topic_read = base + "/topic/read",
    topic_read_by_title = base + "/topic/read_by_title",
    topic_create = base + "/topic/create",
    topic_update = base + "/topic/patch",
    topic_delete = base + "/topic/delete",

    get_active_period = base + "/period/read_last_unfinished",
    period_read = base + "/period/read",
    period_create = base + "/period/create",
    period_update = base + "/period/update",
    period_delete = base + "/period/delete",
    period_finish = base + "/period/finish",
    period_read_by_title = base + "/period/read_period_by_title"

}
export enum frontURLs {
    base = "http://127.0.0.1:3000",
    sign_up = "/sign_up",
    login = "/login",

    note = "/note",
    subject = "/subject",
    topic = "/topic",
    period = "/period",

    period_create = "/period_create",

    single_subject = "/subject/:title",
    single_note = "/note/:title",
    single_topic = "/topic/:title",
    single_period = "/period/:title"


}