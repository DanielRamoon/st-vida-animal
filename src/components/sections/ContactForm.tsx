"use client";

import { useState } from "react";
import { Cta } from "@/components/ui/CtaLink";
import { whatsappHref } from "@/lib/whatsapp";

type FormState = {
  name: string;
  phone: string;
  message: string;
};

const empty: FormState = { name: "", phone: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [feedback, setFeedback] = useState("");

  function update(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next: Partial<FormState> = {};
    if (values.name.trim().length < 2) next.name = "Digite seu nome.";
    if (values.phone.replace(/\D/g, "").length < 8) next.phone = "Digite um telefone válido.";
    if (values.message.trim().length < 5) next.message = "Escreva uma mensagem curta.";
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setFeedback("");
      return;
    }

    const text = `Olá! Meu nome é ${values.name.trim()}. Telefone: ${values.phone.trim()}. ${values.message.trim()}`;
    const opened = window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
    setFeedback(
      opened
        ? "Abrimos o WhatsApp com a sua mensagem pronta para envio."
        : "O navegador bloqueou a nova aba. Permita pop-ups e envie novamente.",
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.8rem] bg-white p-5 text-ink shadow-[0_16px_40px_rgba(20,37,68,0.12)] sm:p-8">
      <h3 className="font-display text-2xl font-extrabold text-brand">Envie uma mensagem</h3>
      <p className="mt-1 text-sm text-muted">Conta pra gente como podemos cuidar do seu pet.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold" htmlFor="nome">
          Nome
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className="mt-1 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 font-normal outline-none focus:border-brand"
          />
          {errors.name ? <span className="mt-1 block text-xs font-medium text-brand">{errors.name}</span> : null}
        </label>

        <label className="block text-sm font-semibold" htmlFor="telefone">
          Telefone
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="mt-1 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 font-normal outline-none focus:border-brand"
          />
          {errors.phone ? <span className="mt-1 block text-xs font-medium text-brand">{errors.phone}</span> : null}
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold" htmlFor="mensagem">
        Mensagem
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className="mt-1 w-full resize-y rounded-2xl border border-ink/10 bg-cream px-4 py-3 font-normal outline-none focus:border-brand"
        />
        {errors.message ? <span className="mt-1 block text-xs font-medium text-brand">{errors.message}</span> : null}
      </label>

      <Cta type="submit" variant="red" showWhatsApp className="mt-5">
        Enviar pelo WhatsApp
      </Cta>
      {feedback ? (
        <p className="mt-3 text-sm font-medium text-navy" role="status">
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
