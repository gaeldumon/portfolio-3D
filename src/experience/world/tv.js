import * as THREE from "three"

import Experience from "../experience"

export default class Tv {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gltfTvModel.scene.children[0];
        this.time = this.experience.time;

        this.debug = this.experience.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('tv');
        }

        this.setModel();

    }

    setModel() {
        this.model = this.resource;
        console.log("TV SKETCHFAB MODEL", this.model);
        this.model.position.set(0, -1, 0);
        this.scene.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }
}
