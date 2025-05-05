import { useRef, useEffect, useState } from "react";
import { annotate } from "rough-notation";
import {
  Notationtype,
  UseTextDecoratorprops,
  UseTextDecoratorReturn,
  RoughAnnotation,
} from "@/components/types";
import { useNotationGroup } from "@/components/RoughNotationGroup";

/**
 * Hook to create and manage a single rough notation annotation
 */
export function useTextDecorator({
  type,
  color = "#000000",
  strokeWidth = 1,
  iterations = 2,
  animationDuration = 800,
  animationDelay = 0,
  padding = 3,
  multiline = true,
  brackets,
  show = false,
}: UseTextDecoratorprops): UseTextDecoratorReturn {
  // Reference to the element to annotate
  const elementRef = useRef<HTMLElement | null>(null);

  // Store the annotation instance
  const annotationRef = useRef<RoughAnnotation | null>(null);

  // Track whether the annotation is showing
  const [isShowing, setIsShowing] = useState(show);

  // Try to get the group context (will be null if not in a group)
  let groupContext;
  try {
    groupContext = useNotationGroup();
  } catch (e) {
    // Not inside a group, that's okay
    groupContext = null;
  }

  // Initialize the annotation when the element is available
  useEffect(() => {
    if (elementRef.current && !annotationRef.current) {
      // Create annotation
      const annotation = annotate(elementRef.current, {
        type,
        color,
        strokeWidth,
        iterations,
        animationDuration,
        
        padding,
        multiline,
        brackets: brackets as any, // Type coercion for brackets
      });

      // Store the annotation
      annotationRef.current = annotation;

      // Add annotation to group if in a group context
      if (groupContext) {
        groupContext.registerAnnotation(annotation);
      }

      // Initialize state based on show prop
      if (show && !isShowing && !groupContext) {
        annotation.show();
        setIsShowing(true);
      }
    }

    // Clean up annotation when unmounting
    return () => {
      if (annotationRef.current && groupContext) {
        groupContext.unregisterAnnotation(annotationRef.current);
      }
    };
  }, [
    type,
    color,
    strokeWidth,
    iterations,
    animationDuration,
    animationDelay,
    padding,
    multiline,
    brackets,
    groupContext,
  ]);

  // Handle show prop changes (only if not in a group)
  useEffect(() => {
    if (annotationRef.current && !groupContext) {
      if (show && !isShowing) {
        annotationRef.current.show();
        setIsShowing(true);
      } else if (!show && isShowing) {
        annotationRef.current.hide();
        setIsShowing(false);
      }
    }
  }, [show, isShowing, groupContext]);

  // Methods to manually show and hide the annotation
  const showAnnotation = () => {
    if (annotationRef.current && !isShowing) {
      annotationRef.current.show();
      setIsShowing(true);
    }
  };

  const hideAnnotation = () => {
    if (annotationRef.current && isShowing) {
      annotationRef.current.hide();
      setIsShowing(false);
    }
  };

  return {
    ref: elementRef,
    show: showAnnotation,
    hide: hideAnnotation,
  };
}
