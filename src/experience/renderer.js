import * as THREE from "three";

import Experience from "./experience";

export default class Renderer {
    constructor() {
        /**
         * @type {Experience}
         * @description Experience class is a singleton, we can safely instanciate it here,
         * the last instanciated version will be returned.
         */
        this.experience = new Experience();

        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = this.experience.canvas;

        /**
         * @type {Sizes}
         */
        this.sizes = this.experience.sizes;

        /**
         * @type {THREE.Scene}
         */
        this.scene = this.experience.scene;

        /**
         * @type {Camera}
         */
        this.camera = this.experience.camera;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        //this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        //this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    }

    update() {
        this.instance.render(this.scene, this.camera.instance);
    }
}