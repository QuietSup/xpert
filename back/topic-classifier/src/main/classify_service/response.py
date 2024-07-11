from typing import TypedDict


class Result(TypedDict):
    label: str
    score: float


class Response(TypedDict):
    data: list[Result] = []
    errors: list[str] = []
