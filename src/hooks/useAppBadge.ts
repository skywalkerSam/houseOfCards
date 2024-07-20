// hook: useAppBadge

import { useState } from "react";

const useAppBadge = () => {
  const [counter, setCounter] = useState(0);

  // setBadge
  function setBadge() {
    setCounter((counter) => ++counter);
    if (navigator.setAppBadge) {
      // for installed PWAs
      navigator.setAppBadge(counter);
    }
    // else if (navigator.setClientBadge) {
    //     // for documents
    //     navigator.setClientBadge()
    // }
  }

  // clearBadge
  function clearBadge() {
    setCounter(0);
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
    }
    // else if (navigator.clearClientBadge) {
    //     navigator.clearClientBadge();
    //   }
  }

  // returning an array, so we can access 'em with destructuring...
  return [setBadge, clearBadge];
  // return {counter, setBadge, clearBadge};
};

export default useAppBadge;
