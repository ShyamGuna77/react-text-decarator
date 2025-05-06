import { useRef, useEffect, useCallback } from "react";
import { annotate } from "rough-notation";
import {
  UseTextDecoratorprops,
  UseTextDecoratorReturn,
  BracketPosition,
} from "../components/types";

export const useTextDecorator = (
  options: UseTextDecoratorprops
): UseTextDecoratorReturn => {
  const elementRef = useRef<HTMLElement>(null);
  const annotationRef = useRef<any>(null);

  const initializeAnnotation = useCallback(() => {
    if (!elementRef.current) return;

    // Clean up previous annotation if it exists
    if (annotationRef.current) {
      annotationRef.current.remove();
    }

    // Create new annotation
    const annotation = annotate(elementRef.current, {
      type: options.type,
      color: options.color,
      animationDuration: options.animationDuration,
      strokeWidth: options.strokeWidth,
      padding: options.padding,
      iterations: options.iterations,
      multiline: options.multiline ?? true,
      brackets: options.brackets as
        | BracketPosition
        | BracketPosition[]
        | undefined,
    });

    // Store annotation on the element for group functionality
    if (elementRef.current) {
      (elementRef.current as any).__rough_annotation = annotation;
      // Add order attribute for group sequencing
      if (typeof options.order === "number") {
        elementRef.current.setAttribute("data-order", options.order.toString());
      }
    }

    annotationRef.current = annotation;

    if (options.show) {
      annotation.show();
    }

    return annotation;
  }, [
    options.type,
    options.color,
    options.animationDuration,
    options.strokeWidth,
    options.padding,
    options.iterations,
    options.multiline,
    options.brackets,
    options.show,
    options.order,
  ]);

  useEffect(() => {
    const annotation = initializeAnnotation();

    return () => {
      if (annotation) {
        annotation.remove();
      }
      if (elementRef.current) {
        delete (elementRef.current as any).__rough_annotation;
        elementRef.current.removeAttribute("data-order");
      }
    };
  }, [initializeAnnotation]);

  const show = useCallback(() => {
    if (annotationRef.current) {
      annotationRef.current.show();
    }
  }, []);

  const hide = useCallback(() => {
    if (annotationRef.current) {
      annotationRef.current.hide();
    }
  }, []);

  return {
    ref: elementRef,
    show,
    hide,
  };
};
