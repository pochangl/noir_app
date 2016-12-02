export abstract class Iterator<T>{
  value: T;
  abstract next ()
  abstract prev ()
}
