import { useEffect } from "react";

const useLazyLoad = (loadMore) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 500;

      if (scrollPosition >= threshold) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]);
};

export default useLazyLoad;
