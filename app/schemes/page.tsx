import React from "react";
import { getSchemes } from "@/services/scheme.service";
import { SchemeExplorer } from "@/components/schemes/scheme-explorer";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { defaultSchemes, SchemeData, SchemeFilterOptions } from "@/lib/data/default-schemes";

export const metadata = {
  title: "सरकारी योजनाएं व सब्सिडी पोर्टल 2026 | Chhaigaon Udyami",
  description:
    "मध्य प्रदेश शासन एवं केंद्र सरकार की प्रमुख स्वरोजगार, बैंक ऋण, 35% तक सब्सिडी और ब्याज अनुदान योजनाएं। पात्रता, आवश्यक दस्तावेज व ऑनलाइन आवेदन लिंक।",
};

export default async function SchemesPage() {
  let initialData: {
    schemes: SchemeData[];
    total: number;
    totalPages: number;
    filterOptions: SchemeFilterOptions;
  } = {
    schemes: defaultSchemes.slice(0, 6),
    total: defaultSchemes.length,
    totalPages: Math.ceil(defaultSchemes.length / 6),
    filterOptions: {
      categories: [
        { value: "subsidy", label: "सब्सिडी / अनुदान", count: 4 },
        { value: "loan", label: "बैंक ऋण", count: 2 },
        { value: "stipend", label: "स्टाइपेंड सहायता", count: 1 },
      ],
      departments: [],
    },
  };

  try {
    const res = await getSchemes({ page: 1, limit: 6 });
    if (res && res.schemes) {
      initialData = {
        schemes: res.schemes,
        total: res.total,
        totalPages: res.totalPages,
        filterOptions: res.filterOptions,
      };
    }
  } catch (err) {
    console.error("SSR failed to load schemes:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 w-full">
        <SchemeExplorer
          initialSchemes={initialData.schemes}
          initialFilterOptions={initialData.filterOptions}
          initialTotal={initialData.total}
          initialTotalPages={initialData.totalPages}
        />
      </main>

      <Footer />
    </div>
  );
}
