# 📔 Documentation

## Concept

#### 🔏 Create a private store

- You will save all the data in the store.
- On creating the store, you will get a **store key**.
- This will prevent other users to get access to your store.
- Save the **key** securely as it will be the first and last time you can see the key
- The **key** will be required to **perform operations** on the store (like adding the data to it, updating it and so on...)

#### 📁 Create Data

- To save the data you will require the **store id** and **store key**.
- The data to be saved should be a **String**.

<br>

## API Usage

### 📎 Index

1. [Create store](#1-create-store)
2. [Create data](#2-create-data)
3. [Update data](#3-update-data)
4. [Get data](#4-get-data)
5. [Delete data](#5-delete-data)
6. [Get store](#6-get-store)
7. [Delete Store](#7-delete-store)

### 1. Create store

**Endpoint**: `/api/store`

**Request Type**: POST

**Body**:

```json
{
  "name": "Store name"
}
```

**Success Response**:

```json
{
  "message": "Store created!",
  "success": true,
  "storeKey": "uuid v4 key",
  "storeId": "store id"
}
```

**Errors**:

- Store already exists <br>
  Try using a different name

<br>

### 2. Create Data

**Endpoint**: `/api/data`

**Request Type**: POST

**Body**:

```json
{
  "storeId": "store id",
  "storeKey": "uuid v4 key",
  "value": "string value"
}
```

**Success Response**:

```json
{
  "message": "Data created successfully",
  "success": true,
  "data": {
    "id": "data id",
    "value": "string value",
    "storeId": "store id"
  },
  "store": {
    "id": "store id",
    "name": "store name"
  }
}
```

**Errors**:

- Store not found
- Invalid store key

<br>

### 3. Update data

**Endpoint**: `/api/data/{{ dataId }}`

**Request Type**: PUT

**Body**:

```json
{
  "storeKey": "uuid v4 key",
  "value": "string value"
}
```

**Success Response**:

```json
{
  "message": "Data updated successfully",
  "success": true,
  "data": {
    "id": "data id",
    "value": "string value"
  },
  "store": {
    "name": "store name",
    "id": "store id"
  }
}
```

**Errors**:

- Data not found
- Data is same
- Invalid store key

<br>

### 4. Get Data

**Endpoint**: `/api/data/{{ dataId }}`

**Request Type**: POST

**Body**:

```json
{
  "storeKey": "uuid v4 store key"
}
```

**Success Response**:

```json
{
  "message": "Data fetched successfully",
  "success": true,
  "data": {
    "id": "data id",
    "value": "string value"
  },
  "store": {
    "name": "store name",
    "id": "store id"
  }
}
```

**Errors**:

- Data not found
- Invalid store key

<br>

### 5. Delete Data

**Endpoint**: `/api/data/{{ dataId }}?delete=true`

**Request Type**: POST

**Body**:

```json
{
  "storeKey": "uuid v4 store key"
}
```

**Success Response**:

```json
{
  "message": "Data deleted successfully",
  "success": true
}
```

**Errors**:

- Data not found
- Invalid store key

<br>

### 6. Get Store

**Endpoint**: `/api/store/{{ storeId }}`

**Request Type**: POST

**Body**:

```json
{
  "storeKey": "uuid v4 store key"
}
```

**Success Response**:

```json
{
  "message": "Store found!",
  "success": true,
  "store": {
    "id": "store id",
    "name": "store name",
    "data": []
  }
}
```

**Errors**:

- Store not found
- Invalid store key

<br>

### 7. Delete Store

**Endpoint**: `/api/store/{{ storeId }}?delete=true`

**Request Type**: POST

**Body**:

```json
{
  "storeKey": "uuid v4 store key"
}
```

**Success Response**:

```json
{
  "message": "Store deleted!",
  "success": true
}
```

**Errors**:

- Store not found
- Invalid store key
