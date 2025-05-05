import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TextDecoratorProps } from "./types";
import { useTextDecorator } from "@/hooks/useTextDecorator";
/**
 * RoughNotation component for React 19
 *
 * A React wrapper for the rough-notation library that creates hand-drawn annotations.
 */
const TextNotationBase: ForwardRefRenderFunction<
  HTMLSpanElement,
  TextDecoratorProps
> = (
  {
    children,
    type = "highlight",
    show = false,
    color = "#000000",
    strokeWidth = 1,
    iterations = 2,
    animationDuration = 800,
    animationDelay = 0,
    padding = 3,
    multiline = true,
    brackets,
    hover = false,
    className = "",
    style = {},
    ...rest
  },
  ref
) => {
  const [isVisible, setIsVisible] = useState(show);

  // Setup annotation
  const {
    ref: elementRef,
    show: showAnnotation,
    hide: hideAnnotation,
  } = useTextDecorator({
    type,
    color,
    strokeWidth,
    iterations,
    animationDuration,
    animationDelay,
    padding,
    multiline,
    brackets,
    show: isVisible,
  });

  // Handle show prop changes
  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  // Handle hover events if hover is enabled
  const handleMouseEnter = useCallback(() => {
    if (hover) setIsVisible(true);
  }, [hover]);

  const handleMouseLeave = useCallback(() => {
    if (hover && !show) setIsVisible(false);
  }, [hover, show]);

  // Combine refs (forwardRef + internal ref)
  const setRefs = useCallback(
    (element: HTMLSpanElement | null) => {
      // Internal ref for rough-notation
      if (elementRef && "current" in elementRef) {
        (elementRef as React.MutableRefObject<HTMLSpanElement | null>).current =
          element;
      }

      // Forward ref from parent
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    },
    [ref, elementRef]
  );

  return (
    <span
      ref={setRefs}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </span>
  );
};

export const TextNotation = forwardRef(TextNotationBase);

// Display name for React DevTools
TextNotation.displayName = "TextNotation";
