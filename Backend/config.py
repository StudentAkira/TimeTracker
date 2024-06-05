from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_secret_key: str = "dc0c7dc1017da8a20c2ece2d6bea864d81fde85a04a692ea3bc8d2365603263349d712db953651a3d1bd6128bb5ab44496cacac30f3433f6763e4b14cb3f5918"

    jwt_token_secret: str = "8508cc437a8ceca2a1a930ced2f40f57e617c5d790e2d662425d20c72386adc0c0a67bff18286870cfe86d859620a86177651afd2a817f69c0e0c7aa1b553ccf"
    jwt_algorithm: str = "HS256"
    jwt_token_expiration_time_days: int = 15

    frontend_domain: str = "127.0.0.1"

    db: str = "postgresql"
    db_name: str = "time_tracker_db"
    db_user: str = "postgres"
    db_password: str = "postgres"
    db_host: str = "127.0.0.1"

    model_config = SettingsConfigDict(env_file='.env')


@lru_cache
def get_settings():
    return Settings()
