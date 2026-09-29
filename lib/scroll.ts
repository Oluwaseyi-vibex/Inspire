import type { MouseEvent } from "react";
import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let navigate: ((href: string) => void) | null = null;

/** Called once from inside <ReactLenis> to expose the instance app-wide. */
export function registerLenis(instance: Lenis | null | undefined) {
  lenisInstance = instance ?? null;
}

/** Registers Next.js SPA navigation (avoids full-page reloads). */
export function registerNavigator(fn: (href: string) => void) {
  navigate = fn;
}

/** Offset (px) so section tops clear the fixed navbar. */
const NAV_OFFSET = -80;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToElement(element: HTMLElement) {
  if (prefersReducedMotion()) {
    if (lenisInstance) {
      lenisInstance.scrollTo(element, {
        immediate: true,
        offset: NAV_OFFSET,
      });
    } else {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
    return;
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: NAV_OFFSET,
      duration: 1.0,
      easing: easeOutExpo,
    });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Animate-scroll to a section by id. Returns false if the element is missing. */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;
  scrollToElement(element);
  // Reflect the target in the URL without triggering a native jump.
  window.history.replaceState(null, "", `#${id}`);
  return true;
}

export function scrollToTopAnimated() {
  if (prefersReducedMotion()) {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.0, easing: easeOutExpo });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Go to a section by id. Animates if the section is on this page,
 * otherwise navigates home first (deep-link registrar scrolls on load).
 */
export function goToSection(id: string) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (element) {
    scrollToElement(element);
    // Reflect the target in the URL without triggering a native jump.
    window.history.replaceState(null, "", `#${id}`);
  } else if (navigate) {
    navigate(`/#${id}`);
  } else {
    // Fallback when the Next.js navigator isn't registered (e.g. SSR edge).
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `/#${id}`;
  }
}

/**
 * Attach to hash-link onClick to get animated scrolling while keeping the
 * href for semantics, right-click copy, and no-JS fallback.
 */
export function handleHashClick(e: MouseEvent, hash: string) {
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  ) {
    return;
  }
  const id = hash.replace(/^#/, "");
  if (!id) return;
  e.preventDefault();
  goToSection(id);
}
