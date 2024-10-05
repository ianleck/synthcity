import { AudioLoader, TextureLoader } from 'three';

class AssetLoader {
  private audioLoader: AudioLoader;
  private textureLoader: TextureLoader;

  constructor() {
    this.audioLoader = new AudioLoader();
    this.textureLoader = new TextureLoader();
  }

  loadAudio(url: string): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      this.audioLoader.load(url, resolve, undefined, reject);
    });
  }

  loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });
  }

  async loadAllAssets() {
    const audioFiles = [
      'car_ambient.wav',
      'car_stress.wav',
      'car_wind.wav',
      'chime_down.wav',
      'chime_up.wav',
      'city_ambient.wav',
      'crash.wav',
      'traffic_ambient.wav'
    ];

    const audioPromises = audioFiles.map(file => 
      this.loadAudio(`/assets/sounds/${file}`)
    );

    const loadedAudio = await Promise.all(audioPromises);

    // Return an object with all loaded assets
    return {
      audio: {
        carAmbient: loadedAudio[0],
        carStress: loadedAudio[1],
        carWind: loadedAudio[2],
        chimeDown: loadedAudio[3],
        chimeUp: loadedAudio[4],
        cityAmbient: loadedAudio[5],
        crash: loadedAudio[6],
        trafficAmbient: loadedAudio[7]
      }
    };
  }
}

export const assetLoader = new AssetLoader();
