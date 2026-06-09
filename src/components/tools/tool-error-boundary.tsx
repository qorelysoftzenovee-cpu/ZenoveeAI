"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { Component } from "react";

type ToolErrorBoundaryProps = {
  children: ReactNode;
};

type ToolErrorBoundaryState = {
  hasError: boolean;
};

export class ToolErrorBoundary extends Component<
  ToolErrorBoundaryProps,
  ToolErrorBoundaryState
> {
  public state: ToolErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ToolErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error("Dynamic tool rendering failed:", error);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="space-y-6">
          <div className="fixed right-6 top-6 z-50 rounded-2xl border border-amber-400/30 bg-[#120f06] px-4 py-3 text-sm font-medium text-amber-100 shadow-2xl shadow-black/30 backdrop-blur">
            Engine busy, trying alternative node
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 text-amber-200">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  Recovery mode
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Engine busy, trying alternative node
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                  The tool interface hit a temporary execution issue. Your dashboard is still
                  safe. Please retry the tool and the platform will attempt another clean
                  processing path.
                </p>

                <button
                  type="button"
                  onClick={this.handleRetry}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry tool view
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}
