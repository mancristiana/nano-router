import React, { useLayoutEffect, useState } from "react";
import { RouterLocationContext } from "./RouterContext.js";
import { useRouter } from "./useRouter.js";

export const RouterSubscription = ({ children }) => {
  const router = useRouter();
  const [match, setMatch] = useState({
    route: router.route,
    location: router.location,
    params: router.params,
    queryParams: router.queryParams,
  });

  useLayoutEffect(() => {
    const unsubscribe = router.listen(() => {
      setMatch({
        route: router.route,
        location: router.location,
        params: router.params,
        queryParams: router.queryParams,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <RouterLocationContext.Provider value={match}>
      {children}
    </RouterLocationContext.Provider>
  );
};
