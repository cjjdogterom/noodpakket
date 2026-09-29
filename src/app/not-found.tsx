import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold tracking-tighter text-amber">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">Deze pagina bestaat niet</h1>
      <Link href="/" className="mt-8 inline-block rounded-full bg-amber px-7 py-3.5 font-semibold text-night">
        Terug naar home
      </Link>
    </div>
  );
}
