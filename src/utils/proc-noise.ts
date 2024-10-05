import Alea from './alea';

class Perlin {
  private alea_rand: () => number;
  private PERLIN_YWRAPB: number = 4;
  private PERLIN_YWRAP: number = 1 << 4;
  private PERLIN_ZWRAPB: number = 8;
  private PERLIN_ZWRAP: number = 1 << 8;
  private PERLIN_SIZE: number = 4095;
  private perlin_octaves: number = 4;
  private perlin_amp_falloff: number = 0.5;
  private perlin_array: number[] = [];
  private cosLUT: number[] = [];
  private perlin_TWOPI: number;
  private perlin_PI: number;

  constructor(seed?: number | string) {
    this.alea_rand = seed !== undefined ? new Alea(seed) : new Alea();
    
    const DEG_TO_RAD = 0.0174532925;
    const SINCOS_PRECISION = 0.5;
    const SINCOS_LENGTH = Math.floor(360 / SINCOS_PRECISION);
    
    for (let i = 0; i < SINCOS_LENGTH; i++) {
      this.cosLUT[i] = Math.cos(i * DEG_TO_RAD * SINCOS_PRECISION);
    }
    
    this.perlin_TWOPI = SINCOS_LENGTH;
    this.perlin_PI = SINCOS_LENGTH;
    this.perlin_PI >>= 1;
  }

  noiseReseed(): void {
    this.alea_rand = new Alea();
    this.perlin_array = [];
  }

  noiseSeed(seed: number | string): void {
    this.alea_rand = new Alea(seed);
    this.perlin_array = [];
  }

  noiseDetail(lod: number, falloff: number): void {
    if (Math.floor(lod) > 0) this.perlin_octaves = Math.floor(lod);
    if (falloff > 0) this.perlin_amp_falloff = falloff;
  }

  private noise_fsc(i: number): number {
    return 0.5 * (1.0 - this.cosLUT[Math.floor(i * this.perlin_PI) % this.perlin_TWOPI]);
  }

  noise(x: number, y: number = 0, z: number = 0): number {
    if (this.perlin_array.length === 0) {
      for (let i = 0; i < this.PERLIN_SIZE + 1; i++) {
        this.perlin_array[i] = this.alea_rand();
      }
    }

    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;
    let r = 0;
    let ampl = 0.5;

    for (let i = 0; i < this.perlin_octaves; i++) {
      let of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB);
      const rxf = this.noise_fsc(xf);
      const ryf = this.noise_fsc(yf);
      
      let n1 = this.perlin_array[of & this.PERLIN_SIZE];
      n1 += rxf * (this.perlin_array[(of + 1) & this.PERLIN_SIZE] - n1);
      let n2 = this.perlin_array[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n2 += rxf * (this.perlin_array[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);
      
      of += this.PERLIN_ZWRAP;
      n2 = this.perlin_array[of & this.PERLIN_SIZE];
      n2 += rxf * (this.perlin_array[(of + 1) & this.PERLIN_SIZE] - n2);
      let n3 = this.perlin_array[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n3 += rxf * (this.perlin_array[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);
      
      n1 += this.noise_fsc(zf) * (n2 - n1);
      r += n1 * ampl;
      ampl *= this.perlin_amp_falloff;
      
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;
      
      if (xf >= 1) { xi++; xf--; }
      if (yf >= 1) { yi++; yf--; }
      if (zf >= 1) { zi++; zf--; }
    }
    return r;
  }
}

export default Perlin;
