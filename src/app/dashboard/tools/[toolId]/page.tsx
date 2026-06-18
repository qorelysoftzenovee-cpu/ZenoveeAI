"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ToolWorkspaceRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toolId = params?.toolId as string;
    if (!toolId) return;
    
    const history = searchParams.get("history");
    let url = `/dashboard?tool=${toolId}`;
    if (history) {
      url += `&history=${history}`;
    }
    router.replace(url);
  }, [params, router, searchParams]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Redirecting to workspace...</p>
      </div>
    </div>
  );
}
