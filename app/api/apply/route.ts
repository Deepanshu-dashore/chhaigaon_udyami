import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      mobile,
      email,
      district,
      state,
      gender,
      category,
      education,
      program,
      hasExistingBusiness,
      businessName,
      seekingSubsidy,
      loanAmount,
      aadharNumber,
    } = body;

    if (!fullName || !mobile) {
      return NextResponse.json(
        { error: "Name and mobile number are required" },
        { status: 400 }
      );
    }

    // Find or create default partner for government subsidy applications
    let defaultPartner = await prisma.marketPartner.findFirst({
      where: { name: { contains: "DIC Khandwa", mode: "insensitive" } },
    });

    if (!defaultPartner) {
      defaultPartner = await prisma.marketPartner.create({
        data: {
          name: "DIC Khandwa & Government Subsidy Cell",
          businessType: "Government Authority",
          description: "District Industries Centre Khandwa Subsidy Verification Cell",
          location: "Khandwa, Madhya Pradesh",
          status: true,
        },
      });
    }

    // Find or create user record by mobile/email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(mobile ? [{ mobile }] : []),
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: fullName,
          mobile: mobile || null,
          email: email || null,
          role: "STUDENT",
          isVerified: false,
          profile: {
            create: {
              district: district || "Khandwa",
              state: state || "Madhya Pradesh",
              businessName: businessName || null,
              occupation: program || "Entrepreneur",
            },
          },
        },
      });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingId = `CU-2026-ADM-${randomNum}`;

    // Store lead record
    const lead = await prisma.marketLead.create({
      data: {
        userId: user.id,
        partnerId: defaultPartner.id,
        message: `Program: ${program} | Subsidy: ${seekingSubsidy} | Category: ${category} | Loan: ${loanAmount} | Aadhar: ${aadharNumber ? "Provided" : "Not Provided"} | Education: ${education} | TrackingID: ${trackingId}`,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      trackingId,
      leadId: lead.id,
      message: "Application submitted successfully",
    });
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
