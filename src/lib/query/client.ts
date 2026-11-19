import { QueryClient } from "@tanstack/react-query";
import { isApiError } from "@/lib/api";

/** Default behaviour for every query/mutation in the app. */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        // Retrying a 4xx never helps; only retry flaky network/5xx once.
        retry: (failureCount, error) =>
          failureCount < 1 &&
          !(isApiError(error) && error.status >= 400 && error.status < 500),
      },
    },
  });
}
