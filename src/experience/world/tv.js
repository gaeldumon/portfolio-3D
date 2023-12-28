import * as THREE from "three"

import Experience from "../experience"

export default class Tv {
    constructor() {
        this.experience = new Experience();

        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.resource = this.resources.items.gltfTvModel.scene;

        this.tvChannelsVideos = [
            document.getElementById('channel1'),
            document.getElementById('channel2'),
        ];

        this.tvChannelsTextures = [
            new THREE.VideoTexture(this.tvChannelsVideos[0]),
            new THREE.VideoTexture(this.tvChannelsVideos[1]),
        ];

        this.currentChannel = 1;

        this.time = this.experience.time;

        this.debug = this.experience.debug;
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('tv');
        }

        this.setModel();
    }

    setModel() {
        this.model = this.resource;
        this.setChannel(this.currentChannel);
        this.model.position.set(0, -1, 0);
        this.scene.add(this.model);
    }

    setChannel(index) {
        this.model.traverse((child) => {
            if (
                child.name === "Plane_Material006_0" &&
                child instanceof THREE.Mesh &&
                child.material.map instanceof THREE.Texture &&
                this.tvChannelsTextures[index] instanceof THREE.Texture
            ) {
                child.material.map = this.tvChannelsTextures[index];
            }
        })
    }
}
