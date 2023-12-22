import * as THREE from "three"

import Experience from "../experience"

export default class Tv {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.gltfTvModel.scene;
        this.time = this.experience.time;

        this.tvChannelsTextures = [
            this.resources.items.channelTextureAdnFamily,
            this.resources.items.channelTextureInstantVital
        ];

        this.currentChannel = 0;

        this.debug = this.experience.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('tv');
        }

        this.setModel();

        this.changeChannel();
    }

    setModel() {
        this.model = this.resource;
        this.model.position.set(0, -1, 0);
        this.scene.add(this.model);
    }

    changeChannel() {
        this.model.traverse((child) => {
            if (
                child.name === "Plane_Material006_0" &&
                child instanceof THREE.Mesh &&
                child.material.map instanceof THREE.Texture
            ) {
                child.material.map = this.tvChannelsTextures[this.currentChannel];
            }
        })
    }
}
