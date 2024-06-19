# StyleGuide:

##

Variable and Function[]

- Use `camelCase` for variable and function names

> Reason: Conventional JavaScript

##

Class[]

- Use `PascalCase` for class names.

> Reason: This is actually fairly conventional in standard JavaScript.

- Use `camelCase` of class members and methods

> Reason: Naturally follows from variable and function naming convention.

##

Interface[]

- Use `PascalCae` for interface names.
- Use `camelCase` for members.

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).

##

Type[]

- Use `camelCase` for members.

##

Enum[]

- Use `PascalCase` for enum names

> Reason: Similar to Class. Is a Type.

- Use `PascalCase` for enum member

> Reason: Convention followed by TypeScript team i.e. the language creators e.g `SyntaxKind.StringLiteral`. Also helps with translation (code generation) of other languages into TypeScript.

- String Enum

- Use `snake_case` or `camelCase` for enum values
  > Reason: Use snake_case for entity name as it is SQL convention and use camelCase for other string enum

##

Null vs. Undefined[]

- Prefer not to use either for explicit unavailability

> Reason: these values are commonly used to keep a consistent structure between values. In TypeScript you use _types_ to denote the structure

let foo \= { x: 123, y: undefined };

let foo: { x: number, y?: number } \= { x:123 };

- Use `undefined` in general (do consider returning an object like `{valid:boolean, value?:Foo}` instead)

- Use `null` where it's a part of the API or conventional

> Reason: It is conventional in Node.js e.g. `error` is `null` for NodeBack style callbacks.

- Use _truthy_ check for **objects** being `null` or `undefined`

- Use `== null` / `!= null` (not `===` / `!==`) to check for `null` / `undefined` on primitives as it works for both `null`/`undefined` but not other falsy values (like `''`, `0`, `false`) e.g.

if (error !== null) // does not rule out undefined

if (error != null) // rules out both null and undefined

##

Formatting[]

The TypeScript compiler ships with a very nice formatting language service. Whatever output it gives by default is good enough to reduce the cognitive overload on the team.

Use [`tsfmt`](https://github.com/vvakame/typescript-formatter) to automatically format your code on the command line. Also, your IDE (atom/vscode/vs/sublime) already has formatting support built-in.

// Space before type i.e. foo:<space>string

const foo: string \= "hello";

##

Quotes[]

- Prefer single quotes (`'`) unless escaping.

> Double quotes are not without merit: Allows easier copy paste of objects into JSON. Allows people to use other languages to work without changing their quote character. Allows you to use apostrophes e.g. `He's not going.`.

- When you can't use double quotes, try using back ticks (\`).

> Reason: These generally represent the intent of complex enough strings.

##

Spaces[]

Use 2 spaces. Not tabs.

##

Array[]

- Annotate arrays as `foos: Foo[]` instead of `foos: Array<Foo>`.

##

Filename[]

Name files with `kebab-case`. E.g. `utils.ts`, `map.ts`, `gen-random.ts` etc.

- Do this as NestJS generate module and files with similar case

> Reason: Helps with consistency (little overthought required) and its what the ecosystem is doing.

##

type vs. interface[]

- Use `type` when you _might_ need a union or intersection:

type Foo = number | { someProperty: number }

- Use `interface` when you want `extends` or `implements` e.g.

interface FooBar extends Foo {

class X implements FooBar {

- Otherwise use whatever makes you happy that day.

##

`==` or `===`[]

Both are used exclusively. Use it appropriately

See more about style guide from:

> > https://ts.dev/style/ >> https://mkosir.github.io/typescript-style-guide >> https://google.github.io/styleguide/tsguide.html
