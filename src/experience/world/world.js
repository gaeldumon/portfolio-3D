import * as THREE from "three";

import Experience from "../experience";
import Environment from "./environment";
import TvChannel from "./tvChannel";
import Tv from "./tv";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Wait for resources to be loaded
        this.resources.on("ready", () => {
            //this.tvChannel = new TvChannel();
            this.tv = new Tv();
            this.environment = new Environment();
        });
    }

    update() {
    }
}