/**
 * Creates a smooth horizontal scroller using requestAnimationFrame
 * Maps vertical wheel/touch to horizontal scroll with interpolation
 */
export function createSmoothHorizontalScroller(container: HTMLElement) {
    let target = container.scrollLeft;
    let current = container.scrollLeft;
    const ease = 0.12; // Adjust for snappier (higher) vs smoother (lower)
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    // Auto-scroll state
    let isAutoScrolling = false;
    let autoScrollStartTime = 0;
    let autoScrollStartPos = 0;
    let autoScrollTargetPos = 0;
    let autoScrollDuration = 0;

    function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Wheel handler - non-passive so we can preventDefault
    // Helper to check if element or its parents can scroll vertically
    function isScrollable(element: HTMLElement | null, direction: number): boolean {
        if (!element || element === container || element.contains(container)) return false;

        const style = window.getComputedStyle(element);
        const overflowY = style.overflowY;
        const isScrollableY = overflowY === 'auto' || overflowY === 'scroll';
        const canScroll = element.scrollHeight > element.clientHeight;

        if (isScrollableY && canScroll) {
            // Check if we're at the boundary
            const atTop = element.scrollTop <= 0;
            const atBottom = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1;

            if (direction < 0 && !atTop) return true; // Scrolling up and not at top
            if (direction > 0 && !atBottom) return true; // Scrolling down and not at bottom
        }

        return isScrollable(element.parentElement, direction);
    }

    // Wheel handler - non-passive so we can preventDefault
    function onWheel(e: WheelEvent) {
        // Check if we should allow native vertical scrolling
        if (isScrollable(e.target as HTMLElement, e.deltaY)) {
            return; // Let native scroll happen
        }

        // Cancel auto-scroll on user interaction
        if (isAutoScrolling) {
            isAutoScrolling = false;
            target = current; // Sync target to current so no jump
        }

        // Map vertical wheel to horizontal scroll
        if (Math.abs(e.deltaY) > 0) {
            e.preventDefault();
            target += e.deltaY;
            // Clamp target to valid scroll range
            target = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, target));
        }
    }

    // Touch handlers for mobile
    let touchStartY = 0;
    let touchStartX = 0;

    function onTouchStart(e: TouchEvent) {
        // Cancel auto-scroll on touch
        if (isAutoScrolling) {
            isAutoScrolling = false;
            target = current;
        }
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }

    function onTouchMove(e: TouchEvent) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const deltaY = touchStartY - currentY;
        const deltaX = touchStartX - currentX;

        // If vertical swipe is more dominant, map to horizontal
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            e.preventDefault();
            target += deltaY;
            target = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, target));
            touchStartY = currentY;
        }
    }

    // RAF loop for smooth interpolation
    function update(timestamp: number) {
        if (isAutoScrolling) {
            const elapsed = timestamp - autoScrollStartTime;
            const progress = Math.min(elapsed / autoScrollDuration, 1);
            const ease = easeInOutCubic(progress);

            current = autoScrollStartPos + (autoScrollTargetPos - autoScrollStartPos) * ease;

            if (progress >= 1) {
                isAutoScrolling = false;
                target = current; // Sync target to end position
            }
        } else {
            current = lerp(current, target, ease);
        }

        container.scrollLeft = Math.round(current);
        rafId = requestAnimationFrame(update);
    }

    // Start RAF loop
    rafId = requestAnimationFrame(update);

    // Attach listeners (passive: false for preventDefault)
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });

    // Expose scrollTo control
    function scrollTo(position: number, immediate = false, duration = 1000) {
        const constrainedPos = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, position));

        if (immediate) {
            isAutoScrolling = false;
            target = constrainedPos;
            current = constrainedPos;
            container.scrollLeft = constrainedPos;
        } else {
            isAutoScrolling = true;
            autoScrollStartTime = performance.now();
            autoScrollStartPos = current;
            autoScrollTargetPos = constrainedPos;
            autoScrollDuration = duration;
            // Also update target so if auto-scroll is cancelled, we don't jump back far
            // Actually, we update target on cancellation.
        }
    }

    // Cleanup function
    const cleanup = () => {
        cancelAnimationFrame(rafId);
        container.removeEventListener('wheel', onWheel);
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('touchmove', onTouchMove);
    };

    return { cleanup, scrollTo };
}

// Export target/current for external access (e.g., for mascot sync)
export function getScrollState(container: HTMLElement) {
    return {
        current: container.scrollLeft,
        max: container.scrollWidth - container.clientWidth
    };
}
