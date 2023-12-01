import * as THREE from "three";

import Experience from "../experience";
import Environment from "./environment";
import Floor from "./floor";
import Fox from "./fox";
import TvChannel from "./tvChannel";
import Tv from "./tv";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Wait for resources to be loaded
        this.resources.on("ready", () => {
            //this.floor = new Floor();
            //this.fox = new Fox();
            //this.tvChannel = new TvChannel();
            this.tv = new Tv();
            this.environment = new Environment();
        });
    }

    update() {
        if (this.fox) {
            // this.fox.update();
        }
    }
}