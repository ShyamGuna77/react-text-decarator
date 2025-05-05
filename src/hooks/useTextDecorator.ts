import { useRef, useEffect, useState } from "react";
import { annotate } from "rough-notation";
import {
  UseTextDecoratorprops,
  UseTextDecoratorReturn,
} from "../components/types";

/**
 * Custom hook for using RoughNotation in React components
 *
 * @param options Configuration options for the rough notation
 * @returns Object with ref, annotation instance, and methods to show/hide
 */
export const useTextDecorator = (
  options: UseTextDecoratorprops
): UseTextDecoratorReturn => {
  const elementRef = useRef<HTMLElement>(null);
  const [annotation, setAnnotation] = useState<any | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Create annotation
    const anno = annotate(elementRef.current, {
      type: options.type,
      color: options.color,
      animationDuration: options.animationDuration,

      strokeWidth: options.strokeWidth,
      padding: options.padding,
      iterations: options.iterations,
      multiline: options.multiline ?? true,
      brackets: options.brackets,
    });

    setAnnotation(anno);

    // Cleanup on unmount
    return () => {
      anno.remove();
    };
  }, [
    options.type,
    options.color,
    options.animationDuration,
    options.animationDelay,
    options.strokeWidth,
    options.padding,
    options.iterations,
    options.multiline,
    options.brackets,
  ]);

  // Show annotation if show prop is true
  useEffect(() => {
    if (annotation && options.show) {
      annotation.show();
    } else if (annotation && options.show === false) {
      annotation.hide();
    }
  }, [annotation, options.show]);

  // Public methods
  const show = () => {
    if (annotation) annotation.show();
  };

  const hide = () => {
    if (annotation) annotation.hide();
  };

  return {
    ref: elementRef,

    show,
    hide,
  };
};
