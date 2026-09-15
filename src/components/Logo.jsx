export default function Logo({ size = 40 }) {
  return (
    <div
      className="relative select-none font-serif font-black leading-none text-white"
      style={{ fontSize: size }}
    >
      E
      <span
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.18,
          height: size * 0.18,
          top: size * 0.02,
          right: -size * 0.14,
        }}
      />
    </div>
  );
}
