import { ColdEmailTool } from "@/components/tools/cold-email-tool";

export default function ColdEmailPage() {
  return (
    <div>
      <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Outbound tools
        </p>
        <h3 className="mt-3 text-2xl font-semibold">Cold email generator</h3>
        <p className="mt-3 text-sm leading-7 text-white/65">
          Generate highly personalised outreach copy while your dashboard sidebar and live credits remain visible.
        </p>
      </div>
      <ColdEmailTool />
    </div>
  );
}
