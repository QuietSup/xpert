import json


def serialize_dict_to_bytes(data: dict):
    if not isinstance(data, dict):
        raise ValueError('Data must be a dictionary')

    return json.dumps(data)


def deserialize_bytes_to_dict(data: str):
    if not isinstance(data, bytes):
        raise ValueError('Data must be a bytes object')

    return json.loads(data)
