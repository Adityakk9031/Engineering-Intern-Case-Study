import { useEffect, useState } from "react";

/**
 * Simple font-loading hook.
 *
 * The original project expected a bundled Devanagari font file, but it is
 * not present in this codebase. To avoid runtime errors from missing assets,
 * we treat fonts as "loaded" immediately and rely on system fonts instead.
 */
export default function useFontsLoad(): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // No async work required – mark fonts as loaded on mount.
    setLoaded(true);
  }, []);

  return loaded;
}


