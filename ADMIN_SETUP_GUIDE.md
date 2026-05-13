# Admin Panel & Email Notifications Setup Guide

This guide will help you set up the complete admin panel with email notifications.

## Features Implemented

✅ **Admin Panel** - Dashboard with role-based access control
✅ **Projects Management** - Add, delete, and manage your projects
✅ **Skills Management** - Add and manage your skills with proficiency levels
✅ **Certifications Management** - Add and manage your certifications
✅ **Blog Posts Management** - Create, edit, and publish blog posts
✅ **Messages Dashboard** - View and manage contact messages from visitors
✅ **Email Notifications** - Receive emails when someone contacts you
✅ **Admin-Only Access** - Only authorized users can access the admin panel

---

## Setup Instructions

### 1. Configure Supabase Admin Role

First, you need to set yourself as an admin in the database. Run this SQL in your Supabase SQL editor:

```sql
-- Replace 'YOUR_USER_ID' with your actual Supabase auth user ID
INSERT INTO public.user_roles (user_id, role) 
VALUES ('YOUR_USER_ID', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

**How to find your User ID:**
1. Go to Supabase dashboard
2. Navigate to Authentication → Users
3. Click on your user and copy the ID from the URL or user details

---

### 2. Set Up EmailJS for Email Notifications

#### Step A: Create EmailJS Account

1. Visit [EmailJS](https://www.emailjs.com)
2. Sign up for a free account
3. Go to Dashboard → Email Services
4. Click "Add Service" and select Gmail (or your email provider)
5. Follow the authentication steps
6. Name your service (e.g., "Gmail Service")
7. Copy your **Service ID** (e.g., `service_abc123...`)

#### Step B: Create Email Templates

##### Admin Notification Template

1. Go to Dashboard → Email Templates
2. Click "Create New Template"
3. Name it "Admin Notification"
4. Set up the template with these variables:

```
Subject: New Contact Request - {{subject}}

Body:
You have a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Visit your admin panel to reply: https://yoursite.com/admin
```

5. Copy the **Template ID** (e.g., `template_abc123...`) - this is your `VITE_EMAILJS_ADMIN_TEMPLATE_ID`

##### User Confirmation Template

1. Create another template called "Contact Confirmation"
2. Set up:

```
Subject: We received your message!

Body:
Hi {{to_name}},

Thank you for reaching out! I've received your message about "{{subject}}" and will get back to you as soon as possible.

Best regards,
Mohammed Afnan

---
In the meantime, check out my portfolio: https://yoursite.com
```

3. Copy the **Template ID** - this is your `VITE_EMAILJS_CONFIRM_TEMPLATE_ID`

#### Step C: Get Your Public Key

1. Go to Dashboard → Account
2. Copy your **Public Key** (starts with a hash like `xyz_...`)

---

### 3. Update Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# From EmailJS Dashboard
VITE_EMAILJS_SERVICE_ID=service_abc123...
VITE_EMAILJS_PUBLIC_KEY=xyz_...
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_123...
VITE_EMAILJS_CONFIRM_TEMPLATE_ID=template_confirm_123...

# Your admin email (where you'll receive notifications)
VITE_ADMIN_EMAIL=your_email@gmail.com

# Supabase (if not already configured)
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
```

---

### 4. Deploy Supabase Migration

The certifications table has already been created via migration. To apply it:

```bash
# If using Supabase CLI
supabase db push
```

Or run the SQL manually in Supabase:

```sql
-- This migration creates the certifications table
-- It's in: supabase/migrations/20260413_add_certifications_table.sql
```

---

## How to Use the Admin Panel

### Accessing the Admin Panel

1. Navigate to `https://yoursite.com/admin`
2. You'll be prompted to log in with your Supabase credentials
3. If you're an admin, you'll see the dashboard

### Dashboard Tabs

#### Overview
- View statistics for all your content
- See recent contact messages

#### Projects
- Add new projects with title, description, URLs, and tags
- Delete existing projects
- Organize your portfolio

#### Skills
- Add technical skills with proficiency levels (0-100)
- Organize by category (Frontend, Backend, etc.)
- Visual proficiency bars

#### Certifications
- Add certifications with issuer and dates
- Optional: Add credential IDs and verification URLs
- Display expired or current status

#### Blog
- Create new blog posts with markdown support
- Draft and publish posts
- Auto-generate slugs or custom URLs
- View all posts with publish status

#### Messages
- View all contact messages from your portfolio
- Mark messages as read/unread
- Send email replies to visitors (auto-sends confirmation template)
- Delete messages

---

## Testing Email Notifications

### Test 1: Send Admin Notification

1. Go to your portfolio contact form
2. Fill in and submit a message
3. Check your admin email - you should receive the notification
4. The message will appear in `/admin` → Messages tab

### Test 2: Send Reply from Admin Panel

1. In `/admin` → Messages
2. Click "Reply" on any message
3. An auto-reply will be sent to the visitor confirming you received it

---

## Troubleshooting

### Emails not sending?

1. **Check environment variables**: Ensure all `VITE_EMAILJS_*` variables are set correctly
2. **Verify EmailJS setup**: Test in EmailJS dashboard → Email Templates → Test
3. **Check spam folder**: Sometimes emails end up in spam
4. **Check browser console**: Look for error messages when submitting the form

### Admin panel showing "Access Denied"?

1. Make sure you're logged in with your Supabase account
2. Verify you've added yourself to `user_roles` table with `admin` role
3. Refresh the page after adding the role

### Certifications not showing up?

1. Make sure the Supabase migration was applied
2. Run the migration SQL manually if needed
3. Check that you have the correct table structure in Supabase

---

## Security Notes

- Admin panel is protected by Supabase Row Level Security (RLS)
- Only users with the `admin` role can modify content
- Contact messages are stored securely in your Supabase database
- Email credentials are stored in environment variables (never commit `.env.local`)

---

## Next Steps

1. ✅ Create your admin account (already set up)
2. ✅ Set up admin role in Supabase (instructions above)
3. ✅ Set up EmailJS (instructions above)
4. 📝 Fill in `.env.local` with your credentials
5. 🚀 Test the contact form and admin panel
6. 🎉 Start managing your portfolio!

---

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all environment variables are correctly set
3. Ensure EmailJS templates have the correct variable names
4. Check Supabase RLS policies in the dashboard

