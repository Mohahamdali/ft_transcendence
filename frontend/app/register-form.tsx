"use client";

import { useRef, useState, type FormEvent } from "react";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const requestPending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    requestPending.current = true;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Django needs a security token and its cookie before accepting the form.
      const csrfResponse = await fetch("/api/users/csrf/", {
        credentials: "same-origin",
        mode: "same-origin",
        cache: "no-store",
        signal: controller.signal,
      });
      const csrfData = await csrfResponse.json().catch(() => null);

      if (!csrfResponse.ok || typeof csrfData?.csrfToken !== "string") {
        setFeedback({
          type: "error",
          message: "Impossible de préparer l’inscription. Réessaie dans un instant.",
        });
        return;
      }

      const response = await fetch("/api/users/register/", {
        method: "POST",
        credentials: "same-origin",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfData.csrfToken,
        },
        body: JSON.stringify({
          username: fields.get("username"),
          password: fields.get("password"),
        }),
        signal: controller.signal,
      });

      if (response.status === 201) {
        form.reset();
        setFeedback({ type: "success", message: "Ton compte a bien été créé !" });
        return;
      }

      const result = await response.json().catch(() => null);
      let message = "L’inscription a échoué. Réessaie dans un instant.";

      if (response.status === 403) {
        message = "La vérification de sécurité a échoué. Réessaie.";
      } else if (response.status === 409) {
        message = "Ce pseudo est déjà utilisé. Choisis-en un autre.";
      } else if (response.status === 400 && typeof result?.error === "string") {
        message = result.error;
      }

      setFeedback({ type: "error", message });
    } catch {
      setFeedback({
        type: "error",
        message: "Impossible de joindre le serveur. Vérifie ta connexion et réessaie.",
      });
    } finally {
      window.clearTimeout(timeout);
      requestPending.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="register-title"
      className="rounded-xl border border-slate-700 bg-slate-900 p-6"
    >
      <h1 id="register-title" className="text-2xl font-semibold">
        Créer un compte
      </h1>

      <form
        method="post"
        onSubmit={handleSubmit}
        onChange={() => setFeedback(null)}
        aria-busy={isSubmitting}
        aria-describedby="register-notice"
        className="mt-6 space-y-5"
      >
        <div>
          <label htmlFor="register-username" className="mb-2 block font-medium">
            Pseudo
          </label>
          <input
            id="register-username"
            name="username"
            type="text"
            autoComplete="username"
            maxLength={150}
            required
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label htmlFor="register-password" className="mb-2 block font-medium">
            Mot de passe
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            disabled={isSubmitting}
            aria-describedby="register-password-help"
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <p id="register-password-help" className="mt-2 text-sm text-slate-400">
            8 caractères minimum.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Création du compte…" : "S’inscrire"}
        </button>
        <p
          id="register-notice"
          role={feedback?.type === "error" ? "alert" : "status"}
          className={`text-center text-sm ${
            feedback?.type === "error" ? "text-red-300" : "text-green-300"
          }`}
        >
          {feedback?.message}
        </p>
      </form>
    </section>
  );
}
