from datetime import datetime


class DateUtil:
    def __init__(self):
        pass

    def get_difference_in_hours(self, end_time: datetime, start_time: datetime) -> float:
        end_timestamp = end_time.timestamp()
        start_timestamp = start_time.timestamp()

        return (end_timestamp - start_timestamp) / 3600
