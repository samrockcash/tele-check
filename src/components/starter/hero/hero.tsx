import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
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
    console.log("TELEGRAM LOADED!!!!!");
    // tele.ready();

    script.onerror = reject;
    document.head.appendChild(script);
    script.remove();
  });
};

export const handleShowButton = (show: boolean) => (show ? true : false);

export default component$(() => {
  const showButton = useSignal(false);

  useVisibleTask$(() => {
    loadTelegram();
  });
  return (
    <div class={["container", styles.hero]}>
      <h1>
        So <span class="highlight">fucking fantastic!!!</span>
        <br />
        to have <span class="highlight">you</span> here
      </h1>
      <p>Have fun building your App with Qwik.</p>
      <div class={styles["button-group"]}>
        <button
          onClick$={async () => {
            // console.log(window.Telegram.WebApp.MainButton.show());
            const btn = window.Telegram.WebApp.MainButton;

            showButton.value = !showButton.value;
            // console.log(showButton);
            showButton.value
              ? btn.show() //console.log("btn.show()")
              : btn.hide(); //console.log("btn.hide()");
          }}
        >
          Show Button on Telegram
        </button>
        <a
          href="https://qwik.builder.io/docs"
          target="_blank"
          class="button button-dark"
        >
          Explore da docs
        </a>
      </div>
    </div>
  );
});
