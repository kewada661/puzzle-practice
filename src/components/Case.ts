import { scrambles } from "./scrambles";
import { names } from "./names";
import { algs } from "./algs";
import reactLogo from '../assets/react.svg'

class Case {
  step: number;
  number: number;
  name: String;
  scramble: String;
  solve: String;
  imgURL: string;

  constructor(step: number,) {
    this.step = step;
    this.number = Math.floor(Math.random() * scrambles[this.step].length)
    this.name = names[this.step][this.number];
    this.scramble = scrambles[this.step][this.number][Math.floor(Math.random() * scrambles[this.step][this.number].length)];
    this.solve = algs[this.step][this.number].alg[0];
    console.log(reactLogo);
    this.imgURL = reactLogo;
  }
}

export { Case }