import { InlineWidget } from "react-calendly";
import { AlertCircle } from "lucide-react";

export default function CalendlyBooking() {
    const url = "https://calendly.com/teamxfactor7799";

    // Simple validation for Calendly URL structure
    const isValidUrl =
        url &&
        typeof url === "string" &&
        url.trim().startsWith("https://calendly.com/") &&
        url.trim().length > 21;

    if (!isValidUrl) {
        return (
            <div
                className="flex flex-col items-center justify-center p-8 text-center rounded-md border shadow-ember-glow"
                style={{
                    height: "700px",
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)"
                }}
            >
                <div className="w-16 h-16 mb-5 rounded-full bg-theme-border flex items-center justify-center" style={{ color: "var(--color-ember)" }}>
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 text-white" style={{ fontFamily: "'Anton', sans-serif" }}>
                    Something went wrong
                </h3>
                <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--color-text-dim)", fontFamily: "'Inter', sans-serif" }}>
                    The booking calendar could not be loaded because the configuration link is invalid or missing.
                </p>
            </div>
        );
    }

    return (
        <div style={{ height: "700px" }} className="w-full max-w-full overflow-hidden">
            <InlineWidget
                url={url}
                styles={{ height: "100%", width: "100%" }}
            />
        </div>
    );
}