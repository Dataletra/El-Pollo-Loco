class MyAudio {
    file;
    isLoaded;

    constructor(_file) {
        this.file = new Audio(_file);
    }
}


class AudioHub {
    static CHARACTER_DAMAGE = new MyAudio('./assets/sounds/character/characterDamage.mp3');
    static CHARACTER_DEAD = new MyAudio('./assets/sounds/character/characterDead.wav');
    static CHARACTER_JUMP = new MyAudio('./assets/sounds/character/characterJump.wav');
    static CHARACTER_RUN = new MyAudio('./assets/sounds/character/characterRun.mp3');
    static CHARACTER_SNORING = new MyAudio('./assets/sounds/character/characterSnoring.mp3');

    static CHICKEN_DEAD = new MyAudio('./assets/sounds/chicken/chickenDead.mp3');
    static CHICKEN_DEAD_2 = new MyAudio('./assets/sounds/chicken/chickenDead2.mp3');

    static BOTTLE_COLLECT_SOUND = new MyAudio('./assets/sounds/collectibles/bottleCollectSound.wav');
    static COLLECT_SOUND = new MyAudio('./assets/sounds/collectibles/collectSound.wav');

    static ENDBOSS_APPROACH = new MyAudio('./assets/sounds/endboss/endbossApproach.wav');

    static GAME_START = new MyAudio('./assets/sounds/game/gameStart.mp3');

    static BOTTLE_BREAK = new MyAudio('./assets/sounds/throwable/bottleBreak.mp3');

    static allSounds = [
        AudioHub.CHARACTER_DAMAGE,
        AudioHub.CHARACTER_DEAD,
        AudioHub.CHARACTER_JUMP,
        AudioHub.CHARACTER_RUN,
        AudioHub.CHARACTER_SNORING,
        AudioHub.CHICKEN_DEAD,
        AudioHub.CHICKEN_DEAD_2,
        AudioHub.BOTTLE_COLLECT_SOUND,
        AudioHub.COLLECT_SOUND,
        AudioHub.ENDBOSS_APPROACH,
        AudioHub.GAME_START,
        AudioHub.BOTTLE_BREAK,
    ];

    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {
        sound.file.currentTime = 0;
        if (sound.file.readyState > 0 || sound.isLoaded) {
            sound.file.volume = 0.1;
            sound.isLoaded = true;
            sound.file.play();
        }
    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause();
        });
    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.file.pause();
    }
}