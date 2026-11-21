"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PawPrint } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

const SESSION_KEY = "vida-animal-splash-seen";
const AUTO_EXIT_MS = 3600;
const REDUCED_EXIT_MS = 1800;

type SplashScreenProps = {
  onFinish?: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"boot" | "show" | "hide">("boot");
  const finished = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (reduceMotion === null) return;

    let force = false;
    let seen = false;

    try {
      force = new URLSearchParams(window.location.search).has("intro");
      seen = !force && sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      finish(false);
      return;
    }

    setPhase("show");
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(
      () => finish(true),
      reduceMotion ? REDUCED_EXIT_MS : AUTO_EXIT_MS,
    );

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [reduceMotion]);

  function finish(persist: boolean) {
    if (finished.current) return;
    finished.current = true;

    if (persist) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    }

    document.documentElement.style.overflow = "";
    setPhase("hide");
    onFinishRef.current?.();
  }

  if (phase === "boot") {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-cream" aria-hidden>
        <Image
          src="/images/logo.png"
          alt=""
          width={980}
          height={403}
          priority
          className="h-auto w-[min(70vw,16rem)] opacity-90"
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {phase === "show" ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cream"
          role="dialog"
          aria-modal="true"
          aria-label={`Boas-vindas à ${site.name}`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduceMotion ? 1 : 1.03,
            transition: { duration: reduceMotion ? 0.25 : 0.55, ease: "easeInOut" },
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -top-24 -left-16 size-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-28 size-80 rounded-full bg-sun/30 blur-3xl" />
            <div className="absolute top-1/3 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
          </div>

          <motion.div
            className="pointer-events-none absolute top-[12%] left-[8%] text-brand/15"
            animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-18, -10, -18] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <PawPrint className="size-10 sm:size-14" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute top-[16%] right-[10%] text-brand/12"
            animate={reduceMotion ? undefined : { y: [0, 12, 0], rotate: [22, 14, 22] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <PawPrint className="size-12 sm:size-16" />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute bottom-[18%] left-[16%] text-brand/10"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <PawPrint className="size-9 sm:size-12" />
          </motion.div>

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.div
              className="relative"
              initial={reduceMotion ? false : { scale: 0.86, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute inset-[-20%] rounded-full border border-brand/25"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [0.96, 1.1, 0.96], opacity: [0.25, 0.65, 0.25] }
                }
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <span
                className="absolute inset-[-8%] rounded-full bg-white/80 shadow-[0_22px_55px_rgba(169,0,8,0.14)] backdrop-blur-sm"
                aria-hidden
              />
              <Image
                src="/images/logo.png"
                alt={site.name}
                width={980}
                height={403}
                priority
                className="relative h-auto w-[min(78vw,18rem)] sm:w-[20rem]"
              />
            </motion.div>

            <motion.p
              className="mt-7 font-display text-lg font-extrabold tracking-tight text-brand sm:text-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              Amor, carinho e cuidado
            </motion.p>
            <motion.p
              className="mt-2 font-display text-base font-bold text-sun sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              em cada detalhe!
            </motion.p>

            <div className="mt-8 w-full max-w-[15rem]">
              <HeartbeatLine reduced={!!reduceMotion} />
              <motion.div
                className="mx-auto mt-4 h-1.5 overflow-hidden rounded-full bg-brand/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                aria-hidden
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand via-brand-bright to-sun"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: reduceMotion ? 1.2 : 2.7,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={() => finish(true)}
              className="mt-7 rounded-full px-4 py-2 font-display text-sm font-bold text-navy/70 transition hover:bg-white/70 hover:text-brand"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Entrar no site
            </motion.button>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-bright/90 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            aria-hidden
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeartbeatLine({ reduced }: { reduced: boolean }) {
  return (
    <svg viewBox="0 0 220 36" className="mx-auto h-9 w-full overflow-visible text-brand" aria-hidden>
      <motion.path
        d="M2 20 H48 L58 20 L68 8 L82 30 L94 14 L104 20 H218"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduced ? 0.2 : 1.35, delay: 0.15, ease: "easeInOut" }}
      />
      <motion.circle
        cx="2"
        cy="20"
        r="4"
        fill="#FFC400"
        initial={reduced ? false : { opacity: 0 }}
        animate={
          reduced
            ? { opacity: 0 }
            : {
                opacity: [0, 1, 1, 0],
                cx: [2, 48, 68, 82, 104, 218],
                cy: [20, 20, 8, 30, 20, 20],
              }
        }
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}
