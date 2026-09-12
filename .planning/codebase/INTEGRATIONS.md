# External Integrations

## 1. Supabase
- **Auth**: Email/Password, Mobile OTP & Magic Link login. Handled via `@supabase/ssr` with cookie storage.
- **PostgreSQL Database**: Direct connection string and pooled connection configured in `DATABASE_URL`.
- **Storage Buckets**: PDF course materials, DPR templates, and user profile photos.

## 2. Razorpay
- **Purpose**: Processing UPI and Card payments for paid courses and premium resources.
- **Workflow**:
  1. Client requests order creation -> `services/payment.service.ts` calls Razorpay Orders API.
  2. Client renders Razorpay Checkout modal with order ID.
  3. Webhook / client verification verifies signature using HMAC SHA256 before updating `Order` and `Payment` status.

## 3. VdoCipher
- **Purpose**: Encrypted, DRM protected streaming for course videos to prevent video piracy.
- **Component**: `components/video/vdo-player.tsx` embeds the secure OTP playback player.
