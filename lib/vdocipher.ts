const VDOCIPHER_API_SECRET = process.env.VDOCIPHER_API_SECRET || "";

export interface VdoCipherOtpResponse {
  otp: string;
  playbackInfo: string;
}

export async function generateVdoCipherOtp(
  videoId: string,
  userWatermarkText?: string,
  ttl: number = 300
): Promise<VdoCipherOtpResponse> {
  if (!VDOCIPHER_API_SECRET) {
    throw new Error("VDOCIPHER_API_SECRET is not configured");
  }

  const payload: Record<string, unknown> = {
    ttl,
  };

  if (userWatermarkText) {
    payload.annotate = JSON.stringify([
      {
        type: "rtext",
        text: userWatermarkText,
        alpha: "0.60",
        color: "0xFFFFFF",
        size: "15",
        interval: "5000",
      },
    ]);
  }

  const response = await fetch(
    `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Apisecret ${VDOCIPHER_API_SECRET}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate VdoCipher OTP: ${errorText}`);
  }

  return response.json();
}
