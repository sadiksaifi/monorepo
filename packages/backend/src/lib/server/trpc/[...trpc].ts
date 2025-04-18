import { router } from "../../trpc-router.js";
import { defineTRPCEventHandler } from "@falcondev-oss/nitro-trpc-event-handler";

export default defineTRPCEventHandler({
  router,
  createContext: async (event) => {
    // add your own tRPC context here
    return {
      event,
    };
  },
});
