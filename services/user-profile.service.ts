import prisma from "@/lib/prisma";
import {
  CreateUserProfileDTO,
  UpdateUserProfileDTO,
} from "@/lib/dto";

/**
 * Resolve Prisma User ID from either Prisma CUID or Supabase UUID
 */
export async function resolvePrismaUserId(userIdOrSupabaseId: string): Promise<string | null> {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id: userIdOrSupabaseId },
        { supabaseUserId: userIdOrSupabaseId },
      ],
    },
    select: { id: true },
  });
  return user ? user.id : null;
}

/**
 * Fetch User Profile with user basic info
 */
export async function getUserProfile(userIdOrSupabaseId: string) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return null;

  return prisma.userProfile.findUnique({
    where: { userId: prismaUserId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          mobile: true,
          role: true,
          status: true,
          isVerified: true,
          isOnline: true,
          lastLoginAt: true,
          createdAt: true,
        },
      },
    },
  });
}

/**
 * Create or update User Profile
 */
export async function upsertUserProfile(
  userIdOrSupabaseId: string,
  data: Partial<CreateUserProfileDTO | UpdateUserProfileDTO>
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) {
    throw new Error("User not found in system");
  }

  const {
    profilePhoto,
    address,
    district,
    state,
    pincode,
    businessName,
    businessType,
    occupation,
    bio,
  } = data;

  return prisma.userProfile.upsert({
    where: { userId: prismaUserId },
    create: {
      userId: prismaUserId,
      profilePhoto: profilePhoto ?? null,
      address: address ?? null,
      district: district ?? null,
      state: state ?? "Madhya Pradesh",
      pincode: pincode ?? null,
      businessName: businessName ?? null,
      businessType: businessType ?? null,
      occupation: occupation ?? null,
      bio: bio ?? null,
    },
    update: {
      ...(profilePhoto !== undefined && { profilePhoto }),
      ...(address !== undefined && { address }),
      ...(district !== undefined && { district }),
      ...(state !== undefined && { state }),
      ...(pincode !== undefined && { pincode }),
      ...(businessName !== undefined && { businessName }),
      ...(businessType !== undefined && { businessType }),
      ...(occupation !== undefined && { occupation }),
      ...(bio !== undefined && { bio }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          mobile: true,
          role: true,
        },
      },
    },
  });
}

/**
 * Delete User Profile
 */
export async function deleteUserProfile(userIdOrSupabaseId: string) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) {
    throw new Error("User profile not found");
  }

  return prisma.userProfile.delete({
    where: { userId: prismaUserId },
  });
}
