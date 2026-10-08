# Partner/Distributor Feature - Backend Documentation

## 📋 Database Table Structure

### Table: `partners`

```sql
CREATE TABLE partners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(10) NOT NULL UNIQUE,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(6) NOT NULL,
  referral_code VARCHAR(8) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMP NULL,
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_referral_code (referral_code),
  INDEX idx_city (city),
  INDEX idx_created_at (created_at)
);
```

### Column Details:

| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique ID |
| name | VARCHAR(255) | NOT NULL | Partner name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| phone | VARCHAR(10) | NOT NULL, UNIQUE | 10-digit phone |
| address | VARCHAR(500) | NOT NULL | Street address |
| city | VARCHAR(100) | NOT NULL | Indian state (dropdown value) |
| state | VARCHAR(100) | NOT NULL | Additional state info |
| pincode | VARCHAR(6) | NOT NULL | 6-digit postal code |
| referral_code | VARCHAR(8) | NOT NULL, UNIQUE | **Backend generated** |
| created_at | TIMESTAMP | DEFAULT NOW | Record creation time |
| updated_at | TIMESTAMP | AUTO UPDATE | Last modification time |
| is_active | BOOLEAN | DEFAULT TRUE | Active/inactive status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |

---

## 🔑 Key Points for Backend

### ⚠️ REFERRAL CODE GENERATION - BACKEND RESPONSIBILITY

**DO NOT** generate on frontend!

**Rules:**
- ✅ 8 characters long
- ✅ Lowercase letters (a-z) + digits (0-9)
- ✅ Must be unique in database
- ✅ Generated on Add Partner (POST request)
- ✅ NEVER changes after creation
- ✅ NEVER modifiable via Edit

**PHP Implementation:**
```php
function generateUniqueReferralCode() {
  $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
  do {
    $code = '';
    for ($i = 0; $i < 8; $i++) {
      $code .= $chars[rand(0, strlen($chars) - 1)];
    }
  } while ($this->partnerExists($code)); // Check uniqueness
  
  return $code;
}
```

---

## 📡 API Endpoints

### 1️⃣ GET All Partners (List)
```
GET /api/admin-partners
```

**Query Parameters:**
```
?limit=10&offset=0&search=text&city=Delhi&sort=created_at&order=DESC
```

**Response (200):**
```json
{
  "status": "Success",
  "data": {
    "partners": [
      {
        "id": 1,
        "name": "Arockiam",
        "email": "arockiam@gmail.com",
        "phone": "9443564346",
        "address": "123 Main Street",
        "city": "Tamil Nadu",
        "state": "Tamil Nadu",
        "pincode": "600001",
        "referral_code": "ystxrxsk",
        "created_at": "2025-05-18T10:30:00Z",
        "is_active": true
      }
    ],
    "pagination": {
      "total": 50,
      "limit": 10,
      "offset": 0,
      "pages": 5
    }
  }
}
```

---

### 2️⃣ ADD New Partner
```
POST /api/admin-partners
```

**Request Body:**
```json
{
  "name": "Arockiam",
  "email": "arockiam@gmail.com",
  "phone": "9443564346",
  "address": "123 Main Street",
  "city": "Tamil Nadu",
  "state": "Tamil Nadu",
  "pincode": "600001"
}
```

**Backend Steps:**
1. Validate all required fields
2. Validate email format
3. Validate phone (10 digits only)
4. Validate pincode (6 digits only)
5. Check email uniqueness → Return 409 if exists
6. Check phone uniqueness → Return 409 if exists
7. **GENERATE referral_code** ← Backend does this!
8. Insert into database
9. Return created partner with referral_code

**Success Response (201):**
```json
{
  "status": "Success",
  "message": "Partner added successfully",
  "data": {
    "id": 1,
    "name": "Arockiam",
    "email": "arockiam@gmail.com",
    "phone": "9443564346",
    "address": "123 Main Street",
    "city": "Tamil Nadu",
    "state": "Tamil Nadu",
    "pincode": "600001",
    "referral_code": "ystxrxsk",
    "created_at": "2025-05-18T10:30:00Z"
  }
}
```

**Error Responses:**

Duplicate Email (409):
```json
{
  "status": "Error",
  "message": "Email already exists",
  "code": 409
}
```

Duplicate Phone (409):
```json
{
  "status": "Error",
  "message": "Phone number already exists",
  "code": 409
}
```

Validation Error (400):
```json
{
  "status": "Error",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "phone": "Phone must be 10 digits",
    "pincode": "Pincode must be 6 digits"
  }
}
```

---

### 3️⃣ UPDATE Partner
```
PUT /api/admin-partners/:id
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@gmail.com",
  "phone": "9876543210",
  "address": "New Address",
  "city": "Maharashtra",
  "state": "Maharashtra",
  "pincode": "400001"
}
```

**Backend Steps:**
1. Verify partner exists → Return 404 if not
2. Validate all fields
3. Check email uniqueness (excluding current partner)
4. Check phone uniqueness (excluding current partner)
5. Update record
6. **DO NOT change referral_code**
7. Update updated_at timestamp
8. Return updated partner

**Response (200):**
```json
{
  "status": "Success",
  "message": "Partner updated successfully",
  "data": { /* Updated partner object */ }
}
```

---

### 4️⃣ DELETE Partner (Soft Delete)
```
DELETE /api/admin-partners/:id
```

**Backend Steps:**
1. Verify partner exists → Return 404 if not
2. Set deleted_at = NOW()
3. Keep all historical data
4. Referral code remains in database (linked to deleted partner)
5. Don't include in list queries (WHERE deleted_at IS NULL)

**Response (200):**
```json
{
  "status": "Success",
  "message": "Partner deleted successfully"
}
```

---

## 🔍 Frontend to Backend Mapping

| Frontend Field | Backend Column | Notes |
|----------------|----------------|-------|
| Name | name | Text input |
| Email | email | Lowercase, validated |
| Phone | phone | Numbers only, 10 digits |
| Address | address | Text input |
| City (Dropdown) | city | Indian state name |
| State | state | Text input (user enters) |
| Pincode | pincode | Numbers only, 6 digits |
| Referral Code | referral_code | **NEVER** sent from frontend |

---

## ✅ Validation Rules

### Frontend (Real-time):
- Name: Required, non-empty
- Email: Required, valid format (e.g., user@gmail.com)
- Phone: Required, 10 digits only, no letters
- Address: Required, non-empty
- City: Required, dropdown selection
- State: Required, non-empty
- Pincode: Required, 6 digits only, no letters

### Backend (Must enforce):
- All fields required
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Email unique: Database constraint + Application check
- Phone: Exactly 10 digits, no letters/special chars
- Phone unique: Database constraint + Application check
- Pincode: Exactly 6 digits
- City: Must be from predefined Indian states list
- Referral code: 8 alphanumeric, unique, generated by backend

---

## 🔗 City Dropdown Values

All 36 Indian States (Frontend):
```
Andaman and Nicobar
Andhra Pradesh
Arunachal Pradesh
Assam
Bihar
Chandigarh
Chhattisgarh
Dadra and Nagar Haveli
Daman and Diu
Delhi
Goa
Gujarat
Haryana
Himachal Pradesh
Jammu and Kashmir
Jharkhand
Karnataka
Kerala
Ladakh
Lakshadweep
Madhya Pradesh
Maharashtra
Manipur
Meghalaya
Mizoram
Nagaland
Odisha
Puducherry
Punjab
Rajasthan
Sikkim
Tamil Nadu
Telangana
Tripura
Uttar Pradesh
Uttarakhand
West Bengal
```

Backend should validate city value is from this list.

---

## 🎯 Summary: What's Generated Where

| Data | Generated | Where | When |
|------|-----------|-------|------|
| Referral Code | **YES** | **Backend API** | On POST /api/admin-partners |
| created_at | Auto | **Backend** | Database timestamp |
| updated_at | Auto | **Backend** | Database timestamp |
| deleted_at | User action | **Backend** | On DELETE request |
| Name, Email, Phone, etc. | User input | **Frontend** | Form submission |

---

## 🚨 Important Notes

1. **Referral Code is immutable** - Once created, never change
2. **Soft deletes only** - Use deleted_at, don't remove rows
3. **City is fixed** - Don't create city table, use hardcoded list
4. **Phone uniqueness** - Critical for audit trail
5. **Email uniqueness** - Prevent duplicate registrations
6. **All timestamps in UTC** - Consistent across system
7. **Pagination required** - Always implement limit/offset
8. **Index for performance** - Add indexes on frequently queried columns

---

## 📞 Questions to Clarify with Backend Team

1. Should we display deleted partners? (Suggest: No, only archived)
2. Do we need to track who created/updated? (Suggest: Yes, add created_by, updated_by)
3. Is there a verification process before activating a partner? (Suggest: Maybe add verification_status)
4. Should partners have a rating/performance score? (Suggest: Future feature)
