// PERLIN NOISE
// based 99.999% on Processing's implementation, found here:
// https://github.com/processing/processing/blob/master/core/src/processing/core/PApplet.java
// credit goes entirely to them. i just ported it to typescript.

import { Alea } from "./alea";

export class Perlin {
  private alea_rand: ReturnType<typeof Alea>;
  private PERLIN_YWRAPB: number = 4;
  private PERLIN_YWRAP: number = 1 << this.PERLIN_YWRAPB;
  private PERLIN_ZWRAPB: number = 8;
  private PERLIN_ZWRAP: number = 1 << this.PERLIN_ZWRAPB;
  private PERLIN_SIZE: number = 4095;
  private perlin_octaves: number = 4; // default to medium smooth
  private perlin_amp_falloff: number = 0.5; // 50% reduction/octave
  private perlin_array: number[] = [];
  private cosLUT: number[] = [];
  private perlin_TWOPI: number;
  private perlin_PI: number;
  private perlin_PI_HALF: number;

  constructor() {
    this.alea_rand = Alea(); // use random seed

    // generate cos lookup table
    const DEG_TO_RAD = 0.0174532925;
    const SINCOS_PRECISION = 0.5;
    const SINCOS_LENGTH = Math.floor(360 / SINCOS_PRECISION);
    for (let i = 0; i < SINCOS_LENGTH; i++) {
      this.cosLUT[i] = Math.cos(i * DEG_TO_RAD * SINCOS_PRECISION);
    }
    this.perlin_TWOPI = SINCOS_LENGTH;
    this.perlin_PI = SINCOS_LENGTH;
    this.perlin_PI_HALF = SINCOS_LENGTH;
  }

  noiseReseed(): void {
    this.alea_rand = Alea(); // new random seed
    this.perlin_array = []; // start the perlin array fresh
  }

  noiseDetail(lod: number, falloff: number): void {
    if (Math.floor(lod) > 0) this.perlin_octaves = Math.floor(lod);
    if (falloff !== undefined && falloff > 0) this.perlin_amp_falloff = falloff;
  }

  private noise_fsc(i: number): number {
    return (
      0.5 *
      (1.0 - this.cosLUT[Math.floor(i * this.perlin_PI) % this.perlin_TWOPI])
    );
  }

  noise(x: number, y: number = 0, z: number = 0): number | false {
    if (x === undefined) {
      return false; // we need at least one param
    }

    // build the first perlin array if there isn't one
    if (this.perlin_array.length === 0) {
      for (let i = 0; i < this.PERLIN_SIZE + 1; i++) {
        this.perlin_array[i] = this.alea_rand();
      }
    }

    let xi = Math.floor(x);
    let yi = Math.floor(y);
    let zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let r = 0;
    let ampl = 0.5;

    for (let i = 0; i < this.perlin_octaves; i++) {
      let of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB);
      const rxf = this.noise_fsc(xf);
      const ryf = this.noise_fsc(yf);

      let n1 = this.perlin_array[of & this.PERLIN_SIZE];
      n1 += rxf * (this.perlin_array[(of + 1) & this.PERLIN_SIZE] - n1);
      let n2 = this.perlin_array[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n2 +=
        rxf *
        (this.perlin_array[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] -
          n2);
      n1 += ryf * (n2 - n1);

      of += this.PERLIN_ZWRAP;
      n2 = this.perlin_array[of & this.PERLIN_SIZE];
      n2 += rxf * (this.perlin_array[(of + 1) & this.PERLIN_SIZE] - n2);
      let n3 = this.perlin_array[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
      n3 +=
        rxf *
        (this.perlin_array[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] -
          n3);
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

      if (xf >= 1) {
        xi++;
        xf--;
      }
      if (yf >= 1) {
        yi++;
        yf--;
      }
      if (zf >= 1) {
        zi++;
        zf--;
      }
    }
    return r;
  }
}
