import Image from "next/image";

export function LogoBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <Image
        src="/logo.svg"
        alt="Ramesh Soft Tech Academy"
        width={220}
        height={220}
        priority
        className="h-full w-full object-contain"
      />
    </div>
  );
}
