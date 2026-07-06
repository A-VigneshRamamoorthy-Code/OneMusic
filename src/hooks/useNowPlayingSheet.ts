import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

export interface NowPlayingSheet {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  dragY: number;
  isDragging: boolean;
  handlePointerDown: (event: ReactPointerEvent) => void;
  handlePointerMove: (event: ReactPointerEvent) => void;
  handlePointerUp: (event: ReactPointerEvent) => void;
}

/**
 * State + gesture handling for the full-screen "now playing" bottom sheet:
 * open/close, body scroll lock, Escape to close, and drag-to-dismiss with
 * a distance/velocity threshold and snap-back.
 */
export function useNowPlayingSheet(): NowPlayingSheet {
  const [isOpen, setIsOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ y: number; time: number } | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const handlePointerDown = useCallback((event: ReactPointerEvent) => {
    // Let interactive controls (sliders, buttons, links) handle their own gestures so
    // dragging works "from anywhere" else on the sheet without breaking the scrubber,
    // volume slider or transport buttons.
    const target = event.target as HTMLElement | null;
    if (target && target.closest('input, button, a, [role="slider"], [data-no-drag]')) {
      return;
    }
    dragStartRef.current = { y: event.clientY, time: Date.now() };
    setIsDragging(true);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer capture is best-effort */
    }
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent) => {
    if (!dragStartRef.current) {
      return;
    }
    const delta = event.clientY - dragStartRef.current.y;
    setDragY(delta > 0 ? delta : delta * 0.2);
  }, []);

  const handlePointerUp = useCallback((event: ReactPointerEvent) => {
    if (!dragStartRef.current) {
      return;
    }
    const delta = event.clientY - dragStartRef.current.y;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = delta / Math.max(elapsed, 1);
    dragStartRef.current = null;
    setIsDragging(false);
    if (delta > 140 || velocity > 0.55) {
      setIsOpen(false);
    }
    setDragY(0);
  }, []);

  return { isOpen, open, close, dragY, isDragging, handlePointerDown, handlePointerMove, handlePointerUp };
}
