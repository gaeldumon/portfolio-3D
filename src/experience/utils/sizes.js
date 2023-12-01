import EventEmitter from "./eventEmitter";

export default class Sizes extends EventEmitter {
    constructor() {
        // Calling EventEmitter constructor
        super()

        /**
         * @type {number}
         */
        this.width = window.innerWidth;

        /**
         * @type {number}
         */
        this.height = window.innerHeight;

        /**
         * @type {number}
         */
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // Handle resize
        // Careful, we assume that the experience always fills the viewport !
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
        });
    }
}