"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, Archive, Check } from "lucide-react";

export interface ExerciseFile {
  id: string;
  name: string;
  size: string;
  type: "excel" | "pdf" | "zip" | "document";
  downloadUrl: string;
  description?: string;
}

interface ExerciseFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  files?: ExerciseFile[];
}

const DEFAULT_FILES: ExerciseFile[] = [
  {
    id: "ex-1",
    name: "Chhaigaon_Udyami_DPR_Financial_Model_v2.xlsx",
    size: "2.4 MB",
    type: "excel",
    downloadUrl: "#",
    description: "वित्तीय अनुमान, लाभ-हानि गणना एवं बैंक ऋण हेतु विस्तृत वित्तीय मॉडल",
  },
  {
    id: "ex-2",
    name: "Khandwa_Agri_Processing_Checklist_DIC.pdf",
    size: "1.1 MB",
    type: "pdf",
    downloadUrl: "#",
    description: "डीआईसी खंडवा एवं नाबार्ड दिशानिर्देश अनुसार पात्रता चेकलिस्ट",
  },
  {
    id: "ex-3",
    name: "PMEGP_NABARD_Subsidy_Application_Templates.zip",
    size: "4.8 MB",
    type: "zip",
    downloadUrl: "#",
    description: "आवेदन प्रपत्र, शपथ पत्र एवं आवश्यक संलग्रक दस्तावेज़ संग्रह",
  },
  {
    id: "ex-4",
    name: "Machine_Supplier_Directory_Nimar_Region.pdf",
    size: "850 KB",
    type: "pdf",
    downloadUrl: "#",
    description: "निमाड़ क्षेत्र एवं इंदौर के प्रमाणित मशीनरी व कच्चा माल आपूर्तिकर्ता",
  },
];

export function ExerciseFilesModal({
  isOpen,
  onClose,
  courseTitle = "उद्यमिता एवं व्यवसाय विकास",
  files = DEFAULT_FILES,
}: ExerciseFilesModalProps) {
  const [downloadedIds, setDownloadedIds] = React.useState<Record<string, boolean>>({});

  const handleDownload = (file: ExerciseFile) => {
    setDownloadedIds((prev) => ({ ...prev, [file.id]: true }));
    // Simulate or trigger download
    const link = document.createElement("a");
    link.href = file.downloadUrl === "#" ? "data:text/plain;charset=utf-8,Sample Exercise Data for " + encodeURIComponent(file.name) : file.downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    files.forEach((f) => {
      setDownloadedIds((prev) => ({ ...prev, [f.id]: true }));
    });
    const link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8,All Exercise Files Bundle for " + encodeURIComponent(courseTitle);
    link.download = `${courseTitle.replace(/\s+/g, "_")}_Exercise_Files.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: ExerciseFile["type"]) => {
    switch (type) {
      case "excel":
        return <FileSpreadsheet className="h-6 w-6 text-emerald-600" />;
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "zip":
        return <Archive className="h-6 w-6 text-amber-600" />;
      default:
        return <FileText className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-white sm:rounded-2xl">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>अभ्यास फाइलें (Exercise Files)</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600 pt-1 leading-relaxed">
              वीडियो देखते हुए व्यावहारिक अनुभव प्राप्त करने और अपने प्रोजेक्ट पर कार्य करने के लिए इस कोर्स की अभ्यास फाइलें डाउनलोड करें।
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Files List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            उपलब्ध दस्तावेज ({files.length} फाइलें)
          </div>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
            {files.map((file) => {
              const isDownloaded = downloadedIds[file.id];
              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-50/70 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate" title={file.name}>
                        {file.name}
                      </p>
                      {file.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {file.description}
                        </p>
                      )}
                      <span className="inline-block text-[11px] font-medium text-slate-400 mt-1">
                        {file.size}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={isDownloaded ? "outline" : "secondary"}
                    onClick={() => handleDownload(file)}
                    className="shrink-0 h-8 text-xs font-medium gap-1.5"
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>सहेजा गया</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" />
                        <span>डाउनलोड</span>
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-medium text-slate-600"
          >
            बंद करें
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadAll}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-xs"
          >
            <Download className="h-4 w-4" />
            सभी फाइलें डाउनलोड करें (.ZIP)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
