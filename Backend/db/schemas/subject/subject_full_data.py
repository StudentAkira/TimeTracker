from db.schemas.subject.subject import SubjectSchema
from db.schemas.topic.topic import TopicSchema


class SubjectFullDataSchema(SubjectSchema):
    topics: list[TopicSchema]
