import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import { annotationGroup } from "rough-notation";
import { RoughAnnotation } from "./types";

// Create a context to share annotation references between components
interface NotationGroupContextType {
  registerAnnotation: (annotation: RoughAnnotation) => void;
  unregisterAnnotation: (annotation: RoughAnnotation) => void;
  show: boolean;
}

const NotationGroupContext = createContext<NotationGroupContextType | null>(
  null
);

// Hook to consume the context
export function useNotationGroup() {
  const context = useContext(NotationGroupContext);
  if (!context) {
    throw new Error("useNotationGroup must be used within a TextNotationGroup");
  }
  return context;
}

interface TextDecoratorGroupProps {
  children: ReactNode;
  show?: boolean;
}

/**
 * TextNotationGroup component for React 19
 *
 * Groups multiple TextNotation components to animate them in sequence
 */
const TextNotationGroupBase: ForwardRefRenderFunction<
  HTMLDivElement,
  TextDecoratorGroupProps
> = ({ children, show = false, ...rest }, ref) => {
  // Store references to all annotations in the group
  const annotationsRef = useRef<RoughAnnotation[]>([]);
  const groupRef = useRef<ReturnType<typeof annotationGroup> | null>(null);
  const [isShowing, setIsShowing] = useState(show);

  // Register an annotation with the group
  const registerAnnotation = (annotation: RoughAnnotation) => {
    if (!annotationsRef.current.includes(annotation)) {
      annotationsRef.current.push(annotation);
    }
  };

  // Unregister an annotation from the group
  const unregisterAnnotation = (annotation: RoughAnnotation) => {
    annotationsRef.current = annotationsRef.current.filter(
      (a) => a !== annotation
    );
  };

  // Initialize or update the annotation group when annotations change or show state changes
  useEffect(() => {
    // Only create a group if there are annotations
    if (annotationsRef.current.length > 0) {
      // Create a new annotation group
      groupRef.current = annotationGroup(annotationsRef.current);

      // Show/hide based on the show prop
      if (show && !isShowing) {
        groupRef.current.show();
        setIsShowing(true);
      } else if (!show && isShowing) {
        // Hide each annotation individually since annotationGroup doesn't have a hide method
        annotationsRef.current.forEach((annotation) => {
          if (annotation.isShowing) {
            annotation.hide();
          }
        });
        setIsShowing(false);
      }
    }
  }, [show, isShowing]);

  return (
    <NotationGroupContext.Provider
      value={{ registerAnnotation, unregisterAnnotation, show }}
    >
      <div ref={ref} data-rough-notation-group="" {...rest}>
        {children}
      </div>
    </NotationGroupContext.Provider>
  );
};

export const TextNotationGroup = forwardRef(TextNotationGroupBase);

// Display name for React DevTools
TextNotationGroup.displayName = "TextNotationGroup";
