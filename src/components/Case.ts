import { scrambles } from "./scrambles";
import { names } from "./names";
import { algs } from "./algs";
import reactLogo from '../assets/react.svg'

class Case {
  case_id: number;
  name: String;
  scramble: String;
  solve: String;
  imgURL: string;

  private constructor(case_id: number) {
    this.case_id = case_id + 1;
    this.name = names[case_id];
    this.scramble = scrambles[case_id][Math.floor(Math.random() * scrambles[case_id].length)];
    this.solve = algs[case_id].alg[0];
    this.imgURL = reactLogo;
  }

  public static ByCaseId = (case_id: number) => {
    return new Case(case_id);
  }

  public static OLL = () => {
    const case_id = Math.floor(Math.random() * 57);
    return new Case(case_id);
  }

  public static PLL = () => {
    const case_id = Math.floor(Math.random() * 21) + 56;
    return new Case(case_id);
  }
}

export { Case }