import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { annotationGroup } from "rough-notation";
import { TextDecoratorGroupProps } from "./types";


const TextNotationGroupBase: ForwardRefRenderFunction<
  HTMLDivElement,
  TextDecoratorGroupProps
> = ({ children, show = false, ...rest }, ref) => {
  const groupRef = useRef<any>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const initializeGroup = () => {
      const childAnnotations = document.querySelectorAll(
        "[data-rough-notation]"
      );

      if (childAnnotations.length > 0) {
        // Clean up previous group if it exists
        if (groupRef.current) {
          groupRef.current.hide();
        }

        // Create new annotation group
        const group = annotationGroup(
          Array.from(childAnnotations)
            .map((el) => {
              const annotation = (el as any).__rough_annotation;
              return annotation;
            })
            .filter(Boolean)
        );

        groupRef.current = group;

        if (show) {
          group.show();
        }

        initialized.current = true;
      }
    };

    // Initialize after a short delay to ensure all child annotations are ready
    const timeoutId = setTimeout(initializeGroup, 100);

    return () => {
      clearTimeout(timeoutId);
      if (groupRef.current) {
        groupRef.current.hide();
      }
    };
  }, [show, children]);

  return (
    <div ref={ref} data-rough-notation-group="" {...rest}>
      {children}
    </div>
  );
};

export const TextNotationGroup = forwardRef(TextNotationGroupBase);

// Display name for React DevTools
TextNotationGroup.displayName = "TextNotationGroup";
