import EventEmitter from "./eventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super();

        /**
         * @type {number}
         * @description Contains the timestamp when the experience starts and will stay the same.
         */
        this.start = Date.now();

        /**
         * @type {number}
         * @description Contains the current timestamp and will change on each frame.
         */
        this.current = this.start;

        /**
         * @type {number}
         * @description Contains how much time was spent since the start of the experience.
         */
        this.elapsed = 0;

        /**
         * @type {number}
         * @description Contains how much time was spent since the previous frame. 
         * We set it as 16 by default which is close to how many milliseconds 
         * there is between two frames at 60fps.
         */
        this.delta = 16;

        // Could have called the tick method immediately in the constructor without 
        // the window.requestAnimationFrame, but this would result in a delta equal 
        // to 0 on the first frame.
        window.requestAnimationFrame(() => {
            this.tick();
        })
    }

    /**
     * 
     */
    tick() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        })
    }
}