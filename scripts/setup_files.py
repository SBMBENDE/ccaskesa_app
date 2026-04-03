#!/usr/bin/env python3
"""Script to write all CCASKESA project files."""
import os

BASE = '/Users/sampsonmbende/ccaskesa_app'

files = {}

# ──────────────────────────────────────────────
# prisma/schema.prisma
# ──────────────────────────────────────────────
files['prisma/schema.prisma'] = '''// CCASKESA Alumni Association - Prisma Schema
// Supports multi-branch (multi-tenant) architecture

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("MEMBER")
  avatar    String?
  branch    String?
  country   String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id         String   @id @default(cuid())
  title      String
  slug       String   @unique
  content    String
  excerpt    String?
  coverImage String?
  published  Boolean  @default(false)
  authorId   String
  author     User     @relation(fields: [authorId], references: [id])
  branch     String?
  tags       String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Project {
  id           String    @id @default(cuid())
  title        String
  description  String
  status       String    @default("ONGOING")
  image        String?
  branch       String?
  category     String?
  targetAmount Float?
  raisedAmount Float?    @default(0)
  location     String?
  startDate    DateTime?
  endDate      DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Donation {
  id        String   @id @default(cuid())
  amount    Float
  currency  String   @default("EUR")
  donorName String?
  email     String?
  method    String
  message   String?
  projectId String?
  status    String   @default("PENDING")
  reference String?
  createdAt DateTime @default(now())
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  branch    String?
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

model GalleryItem {
  id          String   @id @default(cuid())
  title       String
  imageUrl    String
  description String?
  branch      String?
  category    String?
  createdAt   DateTime @default(now())
}

model Scholar {
  id        String   @id @default(cuid())
  name      String
  school    String
  level     String
  status    String   @default("ACTIVE")
  startYear Int
  endYear   Int?
  branch    String?
  story     String?
  photo     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Notification {
  id        String   @id @default(cuid())
  title     String
  message   String
  type      String   @default("INFO")
  branch    String?
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
'''

# ──────────────────────────────────────────────
# .env.local (app secrets)
# ──────────────────────────────────────────────
files['.env.local'] = '''DATABASE_URL="file:./dev.db"
JWT_SECRET="ccaskesa_super_secret_jwt_key_change_in_production_2024"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="CCASKESA Alumni Association"

# Payment integrations (add real keys for production)
NEXT_PUBLIC_PAYPAL_CLIENT_ID="your_paypal_client_id"
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# WhatsApp (optional)
NEXT_PUBLIC_WHATSAPP_GROUP_LINK="https://chat.whatsapp.com/your_group_link"
'''

for path, content in files.items():
    full_path = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w') as f:
        f.write(content)
    print(f'  written: {path}')

print('Done!')
