const num: number = 1

const str: string = "ABCDEFG"

// 配列を宣言するときは以下の2種類の宣言が使える

const childlen: Array<string> = ['Amy', 'Basil', 'Clara']
const books: string[] =  ['The Gashlycrumb Tinies: or After the Outing' , 'The Doubtful Guest']

// 宣言を配列にすると、その定義の順番で定義されたTaplle型になる
const tpl: [string, number] = ["One", 1]

// String Literal Types を使うと、補完が効くようになって便利
let child: 'Amy' | 'Basil' | 'Clara'
child = 'Amy'
// 数値でも同じことができる (Numeric Literal Types)
let point: 1 | 2  | 3 | 5 | 8 | 13
//point = 4 //=> "型 '4' を型 '1 | 2 | 3 | 5 | 8 | 13' に割り当てることはできません。"
point = 1

// enumも同様に補完が効くようになる。enumなので実態は数値
enum Child { Amy, Basil, Clara }
Child.Amy

// 型を `|` で区切って宣言するとUnion typeになる。定義したいずれかの値が入ればよい。
 let some: string | number | boolean
 some = true
 some = 4
 some = "なんかしら入れることができる"

// typeof キーワードで変数の型を参照できる。変数定義も追ってくれる。
let exampleObject = { foo: 'foo', bar: 'bar' }
// let anotherObject: typeof exampleObject = { foo: '' } // Property 'bar' is missing in type '{ foo: string; }' but required in type '{ foo: string; bar: string; }'.ts(2741)
let anotherObject: typeof exampleObject = { foo: 'FOO', bar: 'BAR' }

console.log(anotherObject["foo"]) // "FOO"

// keyof キーワードではオブジェクトのプロパティ名称をString Literal Typesで拾ってこれる。 typeof キーワードと併用するとオブジェクトな変数のプロパティを拾ってこれる。
const fooChild =  {
  name: 'Amy',
  causeOfDeach: 'Fell down the stairs'
}

let properties: keyof typeof fooChild
properties = "name"
//properties = "aaa"

// 関数戻り値も推論してくれる。
function fizz(x:number) {
  if (x % 3) {
    return "fizz"
  }else
    return x
}
// function fizz(x: number): number | "fizz"
// 4-1-1
function getFormattedValue(value: number | null) {
  if (value === null) return '-- pt'
  return `${value.toFixed(1)} pt`
}

console.log(getFormattedValue(0.1))
console.log(getFormattedValue(0))
console.log(getFormattedValue(null))

//4-1-2
function greet(name?:string) {
  return `HEllo ${name?.toLocaleUpperCase()}`
}

console.log(greet())
console.log(greet("Amy"))


//4-1-4
type User = {
  age?: number
  name?: string
}
function registerUser(user: User) { }
const maybeUser = {
  age: 10,
  name: 'Basil',
  gender: 'male'
}

const notUser = {
  gender: 'male',
  graduate: 'Tokyo'
}
registerUser(maybeUser)
//registerUser(notUser)  //=>型 '{ gender: string; graduate: string; }' には型 'User' と共通のプロパティがありません。ts(2559)


type anotherUser = {
  name: string,
  [k: string]: number | string
}

const UserA: anotherUser = {
  name: 'Clara',
  age: 12
}

// 4-2-13
type Question = 'exercise_habits' | 'time_of_sleeping'
type Answer = 'mighty' | 'log' | 'few' | 'entirely'
type AnswerUser = {
  name: string
  enquete: { [K in Question]?: Answer }
}

const uu: AnswerUser = {
  name: "Amy",
  enquete: {
    exercise_habits: 'few',
    time_of_sleeping: "mighty"
  }
}
const x = uu.enquete["exercise_habits"]
//const y = uu.enquete["すげえ"] //=> プロパティ 'すげえ' は型 '{ exercise_habits?: "mighty" | "log" | "few" | "entirely" | undefined; time_of_sleeping?: "mighty" | "log" | "few" | "entirely" | undefined; }' に存在しません。ts(7053)

//non null assertion
function greeting(name?: string) {
  console.log(`Hello ${name!.toLocaleLowerCase}`) // 通る
}
greet()


// Generics

interface Box<T> {
  value: T
}

// const box1: Box = {value: 'test' } // =>ジェネリック型 'Box<T>' には 1 個の型引数が必要です。ts(2314
const box2: Box<string> = { value: 'test'}

// ジェネリクスの初期値型があればGenericsの指定はいらなくなる
interface Box2<T = string> {
  value: T
}

const box1: Box2 = {value: 'test' }

// extends
interface Box3<T extends string | number> {
  value: T
}

// const box3: Box3<boolean> = {
//   value: false
// } //型 'boolean' は制約 'string | number' を満たしていません。ts(2344)

function boxed<T>(props: T) {
  return { value: props }
}
const box4 = boxed('test')
const box5 = boxed(4)

//4-3-2

type UserA = User & { name: string }
type UserB = User & { age: number; graduate: string }

function judgeUserType(user: UserA | UserB) {
  if ('gender' in user) {
    const u0 = user
    console.log('user type is UserA | UserB')
  }
  if ('name' in user) {
    const u1 = user
    console.log('user type is UserA')
    return
  }
  const u2 = user
  console.log('user type i UserB')
}