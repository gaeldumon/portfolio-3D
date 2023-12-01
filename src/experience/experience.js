import * as THREE from "three";

import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Resources from "./utils/resources";
import Debug from "./utils/debug";

import sources from "./sources";
import Camera from "./camera";
import Renderer from "./renderer";
import World from "./world/world";

/**
 * Singleton instance of the Experience class
 * @type {Experience | null}
 */
let instance = null;

export default class Experience {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {

        // Setup Singleton
        // This way we are ensuring we only have one instance of it cause it is instanciated 
        // elsewhere, for instance in the Camera class.
        if (instance) {
            // The class already exists, we stop here and return it
            return instance;
        } else {
            // Else, we carry on
            instance = this;
        }

        // Just to be able to access the Experience right from the console
        window.experience = this;

        this.canvas = canvas;

        // Setup Utils
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();

        // Setup Experience
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(sources);
        this.world = new World();

        // Setup Events
        this.sizes.on('resize', () => this.resize());
        this.time.on('tick', () => this.update());

        console.log(
            'Experience created',
            'width', this.sizes.width,
            'height', this.sizes.height,
            'pixelRatio', this.sizes.pixelRatio
        );
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    destroy() {
        this.sizes.off('resize');
        this.time.off('tick');

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key];

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        })

        this.camera.controls.dispose();
        this.renderer.instance.dispose();

        if (this.debug.active) {
            this.debug.ui.destroy();
        }

        // If using post-processing, I will need to dispose of the EffectComposer, 
        // its WebGLRenderTarget and any potential passes I am using.

        // We didn't remove the <canvas> and the last frame is still rendered in it, 
        // but you can remove from the page if you need. Be aware that when we stopped 
        // listening to the Sizes and Time events, those classes will still be listening 
        // to native events. This is not a big deal, but if you are a little picky, 
        // you can also handle disposing of them as well.
    }
}