export default function PhoneShell({ children }) {
  return (
    <div className="min-h-dvh w-full bg-[#050505] font-poppins md:flex md:items-center md:justify-center md:py-8">
      {/* Ambient backdrop, visible only around the phone canvas on desktop */}
      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-accent/[0.06] blur-[120px]" />
      </div>

      <div
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-app-bg text-app-text md:h-[844px] md:max-h-[92vh] md:w-[390px] md:rounded-[2.75rem] md:border-[10px] md:border-[#1c1c1c] md:shadow-2xl md:shadow-black/60"
        style={{ isolation: "isolate" }}
      >
        {/* Notch, desktop-only decoration */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 hidden h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#1c1c1c] md:block" />
        <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scroll-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
