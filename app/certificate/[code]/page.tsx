import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function CertificateSingularRedirectPage({
  params,
}: PageProps) {
  const { code } = await params;
  redirect(`/certificates/${code}`);
}
