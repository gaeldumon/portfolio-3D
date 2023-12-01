import * as THREE from "three";

import Experience from "../experience";

import tvScreenVertexShader from "../shaders/tvScreen/vertex.glsl";
import tvScreenFragmentShader from "../shaders/tvScreen/fragment.glsl";

export default class TvChannel {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry();
        this.setTextures();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
    }

    setTextures() {
        this.channelTextures = [
            this.resources.items.channelTextureAdnFamily,
            this.resources.items.channelTextureInstantVital,
        ];

        this.textures = {};
        this.textures.color = this.channelTextures[1];
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: tvScreenVertexShader,
            fragmentShader: tvScreenFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTexture: { value: this.textures.color }
            }
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    }
}