import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, category, message } = body;

    if (!name || (!email && !phone) || !message) {
      return NextResponse.json(
        { error: "कृपया अपना नाम, संपर्क (ईमेल या फ़ोन) और संदेश दर्ज करें।" },
        { status: 400 }
      );
    }

    // Logging contact inquiry in production backend
    console.log("Contact form submission received:", {
      name,
      email,
      phone,
      subject,
      category,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "आपका संदेश सफलतापूर्वक प्राप्त हो गया है! हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "संदेश भेजने में कोई समस्या आई। कृपया पुनः प्रयास करें।" },
      { status: 500 }
    );
  }
}
