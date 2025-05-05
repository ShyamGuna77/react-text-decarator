import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { annotationGroup } from "rough-notation";
import { TextDecoratorGroupProps } from "./types";
import { RoughAnnotation } from "rough-notation/lib/model";
/**
 * RoughNotationGroup component for React 19
 *
 * Groups multiple RoughNotation components to animate them in sequence
 */
const TextNotationGroupBase: ForwardRefRenderFunction<
  HTMLDivElement,
  TextDecoratorGroupProps
> = ({ children, show = false, ...rest }, ref) => {
  // Track whether the group has been initialized
  const initialized = useRef(false);

  // Initialize the annotation group
  useEffect(() => {
    // Find all RoughNotation components with annotations
    const childAnnotations = document.querySelectorAll("[data-rough-notation]");

    if (childAnnotations.length > 0 && !initialized.current) {
      // Create an annotation group
      const group = annotationGroup(
        Array.from(childAnnotations) as unknown as RoughAnnotation[]
      );

      // Show the group if requested
      if (show) {
        group.show();
      }

      initialized.current = true;
    }
  }, [show, children]);

  return (
    <div ref={ref} data-rough-notation-group="" {...rest}>
      {children}
    </div>
  );
};

export const TextNotationGroup = forwardRef(TextNotationGroupBase);

// Display name for React DevTools
 TextNotationGroup.displayName = " TextNotationGroup ";
