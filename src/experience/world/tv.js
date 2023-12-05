import * as THREE from "three"

import Experience from "../experience"

export default class Tv {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gltfTvModel.scene;
        this.time = this.experience.time;

        this.debug = this.experience.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('tv');
        }

        this.setModel();

    }

    setModel() {
        this.model = this.resource;
        this.model.position.set(0, -1, 0);
        this.scene.add(this.model);
    }
}
