from pydantic import BaseModel


class TopicToSubjectSchema(BaseModel):
    topic_title: str
    subject_title: str
