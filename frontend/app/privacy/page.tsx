export default function PrivacyPage() {
  return (
    <article lang="en" className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy — Development Prototype</h1>
      <p>
        This is an educational prototype. Account registration stores a username
        and a hashed password. Social posting and private messaging are not
        available. Use test credentials, not real personal data.
      </p>
      <p>
        The health-check endpoint checks infrastructure connectivity; the team
        will document actual account, content, retention and deletion practices
        before releasing those features.
      </p>
      <p>Do not use this prototype as a production social network.</p>
    </article>
  );
}
