import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

export class Tournament {

    constructor(name, game, entrants) {
        this.id = nanoid(10);

        this.name = name;
        this.game = game;
        this.entrants = entrants;
        this.creationDate = new Date().toJSON();
    }
}

export class Player {
    constructor(name, email, character) {
        this.name = name;
        this.email = email;
        this.character = character;
    }
}

export let Games = ["Mario Kart", "Super Smash Bros", "CTF", "Corporations with Andy Novocin", "Street Fighter", "Mortal Kombat"];