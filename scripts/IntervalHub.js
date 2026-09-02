/**
 * Tracks every setInterval started via startInterval() so they can all
 * be cleared at once (on game over) instead of being managed individually.
 * Used to avoid reloading the whole webpage to reset intervals globally.
 * @class
 */
export class IntervalHub {
    /** IDs of all currently running intervals. */
    static allIntervals = [];

    /**
     * Starts a setInterval and registers it for later cleanup.
     * @param {Function} func - Callback to run repeatedly.
     * @param {number} timer - Interval in milliseconds.
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Clears every interval started via startInterval().
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
