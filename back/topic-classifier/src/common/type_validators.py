def validate_typed_dict(typ: any, instance: any) -> str | None:
    error = None
    for property_name, property_type in typ.__annotations__.items():
        value = instance.get(property_name, None)
        if value is None:
            # Check for missing keys
            raise TypeError(f"Missing key: {property_name}")
        elif property_type not in (int, float, bool, str):
            # check if property_type is object (e.g. not a primitive)
            result = validate_typed_dict(property_type, value)
        elif not isinstance(value, property_type):
            # Check for type equality
            raise TypeError(
                f"Wrong type: {property_name}. Expected {property_type}, got {type(value)}")
    return True
