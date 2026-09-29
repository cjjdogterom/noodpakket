import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-7xl font-black text-signal">404</p>
      <h1 className="mt-4 font-display text-3xl font-black">Deze pagina bestaat niet</h1>
      <Link href="/" className="mt-8 inline-block rounded-full bg-signal px-7 py-3.5 font-semibold text-white">
        Terug naar home
      </Link>
    </div>
  );
}
