import { useNavigate } from "react-router-dom";

export function useViewTransitionNavigate() {
  const navigate = useNavigate();

  const transitionNavigate = (e, to) => {
    if (e) e.preventDefault();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(to);
      });
    } else {
      navigate(to);
    }
  };

  return transitionNavigate;
}