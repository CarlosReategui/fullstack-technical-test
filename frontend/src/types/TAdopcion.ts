import { TAnimal } from "./TAnimal";
import { TUser } from "./TUser";

export type TAdopcion = {
  id?: number;
  adoptante: TUser;
  voluntario: TUser;
  animal: TAnimal;
  fecha: string;
  finalizado: boolean;
};
