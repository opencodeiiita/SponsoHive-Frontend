# SponsoHive API Endpoints

## Authentication

### 1. **User Registration**
**POST** `/api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "string"
  }
  ```

### 2. **User Login**
**POST** `/api/auth/login`
- **Description**: Authenticate a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
    ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 3. **User Logout**
**POST** `/api/auth/logout`
- **Description**: Log out a user.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## Email Management

### 4. **Upload Email List**
**POST** `/api/emails/upload`
- **Description**: Upload a bulk email list.
- - **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "file": "<CSV/Excel file>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Emails uploaded successfully",
    "processed": "integer",
    "duplicates": "integer",
    "invalid": "integer"
  }
  ```

### 5. **Get Email List**
**GET** `/api/emails`
- **Description**: Retrieve all uploaded emails.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  [
    {
      "email": "string",
      "category": "string",
      "status": "valid | duplicate | invalid"
    }
  ]
    ```

### 6. **Delete Email**
**DELETE** `/api/emails/:emailId`
- **Description**: Delete an email from the list.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Email deleted successfully"
  }
  ```

---

## Campaign Management

### 7. **Create Campaign**
**POST** `/api/campaigns`
- **Description**: Create a new email campaign.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "emails": ["string"],
    "template": "string",
   "schedule": "ISO_8601 string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Campaign created successfully",
    "campaignId": "string"
  }
  ```

### 8. **Get Campaigns**
**GET** `/api/campaigns`
- **Description**: Retrieve all campaigns.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  [
    {
      "campaignId": "string",
      "name": "string",
      "emailsSent": "integer",
      "status": "pending | ongoing | completed"
    }
  ]
  ```

### 9. **Update Campaign**
**PUT** `/api/campaigns/:campaignId`
- **Description**: Update a campaign.
- **Headers**:
-  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "emails": ["string"],
    "template": "string",
    "schedule": "ISO_8601 string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Campaign updated successfully"
  }
  ```

---

## Analytics

### 10. **Get Campaign Analytics**
**GET** `/api/analytics/:campaignId`
- **Description**: Retrieve analytics for a specific campaign.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "openRate": "percentage",
    "clickThroughRate": "percentage",
    "responseRate": "percentage",
     "bounces": "integer",
    "unsubscribes": "integer"
  }
  ```

### 11. **Get General Analytics**
**GET** `/api/analytics`
- **Description**: Retrieve overall email campaign performance.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
    "totalEmailsSent": "integer",
    "totalResponses": "integer",
    "totalBounces": "integer",
    "totalUnsubscribes": "integer"
  }
  ```

---

## Compliance

### 12. **Get Compliance Settings**
**GET** `/api/compliance`
- **Description**: Retrieve GDPR and CAN-SPAM compliance settings.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Response**:
  ```json
  {
   "optOutLink": "string",
    "senderVerification": "boolean"
  }
  ```

### 13. **Update Compliance Settings**
**PUT** `/api/compliance`
- **Description**: Update compliance settings.
- **Headers**:
  - Authorization: `Bearer <token>`
- **Request Body**:
  ```json
  {
    "optOutLink": "string",
    "senderVerification": "boolean"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Compliance settings updated successfully"
  }
  
