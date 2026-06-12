"use client";
import { useCallback } from "react";

/** Clones an image element and arcs it to the cart icon (FLIP technique). */
export function useFlyToCart() {
  return useCallback((sourceEl: HTMLElement) => {
    const cartIcon = document.getElementById("header-cart-icon");
    if (!cartIcon || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const src = sourceEl.getBoundingClientRect();
    const dst = cartIcon.getBoundingClientRect();
    const clone = sourceEl.cloneNode(true) as HTMLElement;

    Object.assign(clone.style, {
      position: "fixed", left: `${src.left}px`, top: `${src.top}px`,
      width: `${src.width}px`, height: `${src.height}px`,
      zIndex: "9999", pointerEvents: "none", borderRadius: "12px",
      overflow: "hidden", margin: "0",
    });
    document.body.appendChild(clone);

    const dx = dst.left + dst.width / 2 - (src.left + src.width / 2);
    const dy = dst.top + dst.height / 2 - (src.top + src.height / 2);

    const anim = clone.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy - 120}px) scale(0.4)`, opacity: 0.9, offset: 0.6 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.05)`, opacity: 0.4 },
      ],
      { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    );

    anim.onfinish = () => {
      clone.remove();
      cartIcon.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }],
        { duration: 300, easing: "ease-out" }
      );
    };
  }, []);
}