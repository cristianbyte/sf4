import { useNavigate } from "react-router-dom";

export function useViewTransitionNavigate() {
  const navigate = useNavigate();
  
  const transitionNavigate = (e, to) => {
    if (e) e.preventDefault();
    
    if (!document.startViewTransition) {
      console.log('View Transitions no soportado, usando navigate normal');
      navigate(to);
      return;
    }
    
    console.log('Iniciando View Transition');
    document.startViewTransition(() => {
      navigate(to);
    });
  };
  
  return transitionNavigate;
}