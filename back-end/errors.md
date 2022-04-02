# Server responses

This document describes how to respond to server requests.

## Responses

### Status: **Success**

```ts
{
    "success": true,
    "data": Object | Array | null
}
```

### Status: **Failure**

```ts
{
    "success": false,
    "data": Object | Array | null,
    "error": [
        {
            "code": number,
            "message": string
        },
        ...
    ]
}
```

## Error codes

| Error type | Description | Code |
| ---------- | ----------- | ---- |
