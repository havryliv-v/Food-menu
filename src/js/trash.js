class User {
   constructor(name, age) {
      this.name = name;
      this._age = age;

   }
   say() {
      console.log(`Users name ${this.name}, age ${this._age}`);
   }

   get age() {
      return this._age;
   }

   set age(age) {
      if (typeof age === 'number' && age > 0 && age < 110) {
         this._age = age;
      } else {
         console.log('Unexpected input');
      }
   }

}

let vitalii = new User('Vitalii', 25);
console.log(vitalii.age);

vitalii.say();

vitalii.age = 40;
console.log(vitalii.age);

vitalii.say();
