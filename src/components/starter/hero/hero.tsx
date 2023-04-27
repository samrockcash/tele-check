import { component$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./hero.module.css";

export const loadTelegram = () => {
  return new Promise<(opts: any) => void>((resolve, reject) => {
    if ((globalThis as any).Telegram) {
      return resolve((globalThis as any).Telegram as any);
    }
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.onload = () =>
      // console.log(globalThis.Telegram.WebApp.ready);
      resolve((globalThis as any).Telegram as any);

    // tele.ready();

    script.onerror = reject;
    document.head.appendChild(script);
    script.remove();
  });
};

export default component$(() => {
  useVisibleTask$(() => {
    loadTelegram();
  });
  return (
    <div class={["container", styles.hero]}>
      <h1>
        So <span class="highlight">fantastic</span>
        <br />
        to have <span class="highlight">you</span> here
      </h1>
      <p>Have fun building your App with Qwik.</p>
      <div class={styles["button-group"]}>
        <button
          onClick$={async () => {
            const tele = window.Telegram.WebApp;
            tele.MainButton.text = "we made uit";
            tele.MainButton.show();
            console.log(tele);
          }}
        >
          Time to celebrate
        </button>
        <a
          href="https://qwik.builder.io/docs"
          target="_blank"
          class="button button-dark"
        >
          Explore the docs
        </a>
      </div>
    </div>
  );
});
