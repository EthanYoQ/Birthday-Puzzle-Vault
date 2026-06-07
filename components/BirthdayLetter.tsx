export function BirthdayLetter({
  letter,
  letterEn,
}: {
  letter: string;
  letterEn?: string;
}) {
  return (
    <article className="rounded-lg border border-amber-200/24 bg-[#fff8e7] p-5 text-slate-950 shadow-gold sm:p-6">
      <div className="mb-4 h-1 w-16 rounded-full bg-amber-500" />
      <p className="whitespace-pre-line text-base leading-8 sm:text-lg">{letter}</p>
      {letterEn ? (
        <p className="mt-5 whitespace-pre-line border-t border-slate-950/10 pt-4 text-sm leading-7 text-slate-700">
          {letterEn}
        </p>
      ) : null}
    </article>
  );
}
