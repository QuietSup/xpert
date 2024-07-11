from typing import TypedDict


class Pattern(TypedDict):
    cmd: str


class Data(TypedDict):
    text: str


class Request(TypedDict):
    pattern: Pattern
    data: Data
    id: str
