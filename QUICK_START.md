# Quick Reference: Admin Panel Setup

## 🚀 Quick Start (5 steps)

### 1. Make Yourself Admin
Go to Supabase SQL Editor and run:
```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('YOUR_USER_ID', 'admin');
```
(Find YOUR_USER_ID in Supabase Auth → Users)

### 2. Set Up EmailJS Account
- Visit https://www.emailjs.com
- Sign up → Copy Service ID and Public Key
- Create 2 email templates (see ADMIN_SETUP_GUIDE.md for template content)

### 3. Fill .env.local
```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_PUBLIC_KEY=xyz_...
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_xxx
VITE_EMAILJS_CONFIRM_TEMPLATE_ID=template_confirm_xxx
VITE_ADMIN_EMAIL=your@email.com
```

### 4. Access Admin Panel
Navigate to: `http://localhost:5173/admin` (or your domain/admin)

### 5. Test It
- Go to contact form on portfolio
- Submit a message
- Check your admin email for notification
- Click "Reply" in Admin Panel to send confirmation

---

## 📋 Admin Panel Features

| Feature | Tab | Capabilities |
|---------|-----|--------------|
| Dashboard | Overview | View stats, recent messages |
| Projects | Projects | Add/Delete projects with images and links |
| Skills | Skills | Add skills with proficiency levels |
| **NEW** | Certifications | Add certifications with issuer and dates |
| Blog | Blog | Create, publish, draft blog posts |
| Messages | Messages | View, reply, delete contact messages |

---

## 🔐 Security
- ✅ Admin-only access (role-based in Supabase)
- ✅ Row-Level Security (RLS) policies enforced
- ✅ Environment variables protect credentials
- ✅ Only admins can modify content

---

## 📧 Email Features
- ✅ Admin gets notified when someone submits contact form
- ✅ Visitor gets auto-confirmation reply
- ✅ Admin can manually send reply from Messages panel
- ✅ Customizable templates in EmailJS

---

## 🐛 Common Issues

**"Access Denied" in admin panel?**
→ Check that you've added yourself to user_roles table with admin role

**Emails not sending?**
→ Verify all VITE_EMAILJS_* variables are in .env.local
→ Check EmailJS dashboard for template setup

**Certifications not showing?**
→ Run migration: `supabase db push`
→ Or manually run SQL from migrations folder

---

## 📚 Full Documentation
See `ADMIN_SETUP_GUIDE.md` for detailed instructions
