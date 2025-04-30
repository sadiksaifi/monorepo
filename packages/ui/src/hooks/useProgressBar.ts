import { useEffect, useState } from "react";

export type UseProgressBarOptions = {
  minLoadingTime?: number; // Minimum loading time in milliseconds
  initialProgress?: number; // Initial progress percentage
  maxProgress?: number; // Maximum progress percentage
  incrementInterval?: number; // Interval for progress increment in milliseconds
  completeDelay?: number; // Delay before hiding the progress bar after completion
};

/**
 * Custom hook to manage a progress bar for loading states.
 * @param isLoading Indicates if the loading is in progress.
 * @param options Configuration options for the progress bar.
 * @returns An object containing the current progress and visibility state of the progress bar.
 * @example
 * const { progress, visible } = useProgressBar(isLoading, {
 *   minLoadingTime: 600, // Minimum loading time in milliseconds
 *   initialProgress: 10, // Initial progress percentage
 *   maxProgress: 90, // Maximum progress percentage
 *   incrementInterval: 200, // Interval for progress increment in milliseconds
 *   completeDelay: 400 // Delay before hiding the progress bar after completion
 * });
 */
export function useProgressBar(isLoading: boolean, options?: UseProgressBarOptions) {
  const minLoadingTime = options?.minLoadingTime || 600;
  const initialProgress = options?.initialProgress || 10;
  const maxProgress = options?.maxProgress || 90;
  const incrementInterval = options?.incrementInterval || 200;
  const completeDelay = options?.completeDelay || 400;
  const [progress, setProgress] = useState(0);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let completeTimeout: NodeJS.Timeout;
    let minLoadingTimeout: NodeJS.Timeout;
    let isMinLoadingComplete = false;

    if (isLoading) {
      // Make the progress bar visible immediately when loading starts
      setVisible(true);
      setProgress(initialProgress); // Start at initial progress instantly for better UX

      // Set a minimum loading time regardless of how fast the route loads
      minLoadingTimeout = setTimeout(() => {
        isMinLoadingComplete = true;
      }, minLoadingTime);

      // Random increments that slow down as we approach maxProgress
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= maxProgress) {
            clearInterval(progressInterval);
            return prevProgress;
          }

          // Calculate a smaller increment as we get closer to maxProgress
          const remaining = maxProgress - prevProgress;
          const increment = Math.max(1, Math.min(10, remaining * 0.15));

          return Math.min(maxProgress, prevProgress + increment);
        });
      }, incrementInterval);
    } else if (isVisible) {
      // Only complete the loading bar if the minimum time has passed
      // or set a timeout to complete it after the minimum time
      const completeLoading = () => {
        setProgress(100);

        // Hide the bar after completion animation
        completeTimeout = setTimeout(() => {
          setVisible(false);
          // Reset progress after hiding
          setTimeout(() => setProgress(0), 200);
        }, completeDelay);
      };

      if (isMinLoadingComplete) {
        completeLoading();
      } else {
        // Wait for minimum loading time to complete
        minLoadingTimeout = setTimeout(completeLoading, minLoadingTime);
      }
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
      clearTimeout(minLoadingTimeout);
    };
  }, [
    isLoading,
    isVisible,
    initialProgress,
    maxProgress,
    incrementInterval,
    minLoadingTime,
    completeDelay,
  ]);

  return { progress, isVisible };
}
