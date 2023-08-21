export type Operation = {
  id: number;
  cost: number;
  type: OpTypes;
  displayName: string;
};

export enum OpTypes {
  addition = "addition",
  subtraction = "subtraction",
  multiplication = "multiplication",
  division = "division",
  square_root = "square_root",
  random_string = "random_string",
}
