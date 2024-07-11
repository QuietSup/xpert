# Classification History Microservice

This microservice provides a set of operations related to classifications and records.

## API

### `get-all-classifications`

Returns all classifications.

#### Input: 
```typescript
{
  "pattern": { "cmd": "get-all-classifications" },
}
```

#### Output: 
```typescript
{
  "data": [
    {
      "msg": string
    }
  ],
  "error": {
    "code": number,
    "message": string
  }
}
```

### `get-classification-by-code`

Returns a specific classification identified by its code.

### `create-classification`

Creates a new classification based on the provided data.

### `delete-classification`

Deletes a specific classification identified by its code.

### `get-records-by-user`

Returns all records for a specific user identified by their user ID.

### `get-all-records`

Returns all records.

### `get-record-by-id`

Returns a specific record identified by its ID.

### `create-record`

Creates a new record based on the provided data.

### `delete-record`

Deletes a specific record identified by its ID.