/**
 * スクロールされた直後のホバーを無視するために、領域ごとに最後にスクロールされた時刻を記録する。
 *
 * - `window` に `scroll` の listener を capture で 1 つだけ登録し、スクロールされた領域（`event.target`）ごとに時刻を記録する。
 *   画面に Tooltip が何個あっても listener は 1 つで、Tooltip がすべてアンマウントされたら解除する。
 *   解除しても記録は消さない。一覧の行がまとめて入れ替わる場合（仮想スクロールなど）は、Tooltip がいったんすべて
 *   アンマウントされてから新しい行がマウントされる。そこで記録を消すと、スクロールの直後なのにホバーを無視できなくなる
 * - 最後の 1 件だけを覚える作りにしない。トリガーを含まない領域（自動でスクロールし続ける枠など）のスクロールが、
 *   トリガーを含む領域のスクロールの記録を上書きしてしまうため
 * - `target` が `Node` でないもの（`window`）は、ページ全体のスクロールとして別に記録する。
 *   `window` を対象に発火した scroll の `event.target` が、`ownerDocument.defaultView` と同じオブジェクトになるとは限らない
 *   （jsdom では別のオブジェクトになる）ため、`window` をキーにして引かない
 * - モジュールの最上位では `window` に触らない（SSR で import しただけで落ちないようにする）
 */

/** スクロールされてからこの時間（ms）が経つまでに届いたホバーは無視する */
export const HOVER_IGNORE_DURATION_AFTER_SCROLL_MS = 200;

let scrollTimes = new WeakMap<Node, number>();
let windowScrollTime: number | null = null;
let subscriberCount = 0;

const handleScroll = (event: Event) => {
  const target = event.target;
  if (target === null) {
    return;
  }
  if (target instanceof Node) {
    scrollTimes.set(target, performance.now());
  } else {
    windowScrollTime = performance.now();
  }
};

/**
 * スクロールの時刻の記録を始める。戻り値の関数で記録をやめる。
 * 最初の 1 個のときだけ `window` に listener を登録し、すべてやめたら解除する。
 */
export const subscribeScrollTime = (): (() => void) => {
  subscriberCount += 1;
  if (subscriberCount === 1) {
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
  }

  let isSubscribed = true;

  return () => {
    // 同じ購読を 2 回やめても数を減らしすぎないようにする
    if (!isSubscribed) {
      return;
    }
    isSubscribed = false;
    subscriberCount -= 1;
    if (subscriberCount === 0) {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    }
  };
};

/**
 * 記録をすべて消す。テスト専用（テスト同士で記録が混ざらないようにするため）。
 * 実行時のコードからは呼ばない。記録は購読をやめても残す作りにしている。
 */
export const resetScrollTimeRecordsForTest = () => {
  scrollTimes = new WeakMap<Node, number>();
  windowScrollTime = null;
};

const isRecent = (scrolledAt: number | null | undefined, now: number) => {
  if (scrolledAt == null) {
    return false;
  }

  // 記録より前の時刻になることは通常ないが、その場合は「直後」とみなさない
  const elapsed = now - scrolledAt;

  return elapsed >= 0 && elapsed < HOVER_IGNORE_DURATION_AFTER_SCROLL_MS;
};

/**
 * `trigger` を内側に含む領域（`trigger` 自身と祖先の要素、`document`、`window`）が、
 * 直近 `HOVER_IGNORE_DURATION_AFTER_SCROLL_MS` 以内にスクロールされたかを返す。
 * トリガーを含まない領域のスクロールは見ない。Shadow DOM の境界はまたがない（useDismissOnScroll と同じ）。
 */
export const isJustAfterScrollOf = (trigger: Element): boolean => {
  const now = performance.now();

  for (let element: Element | null = trigger; element !== null; element = element.parentElement) {
    if (isRecent(scrollTimes.get(element), now)) {
      return true;
    }
  }

  return isRecent(scrollTimes.get(trigger.ownerDocument), now) || isRecent(windowScrollTime, now);
};
