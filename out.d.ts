declare module "pkg1/src/foo" {
    export function foo(x: any): number;
    export function bar(x: any): any;
}
declare module "pkg1" {
    import { foo } from "pkg1/src/foo";
    import { bar } from "pkg1/src/foo";
    export function baz(): {
        a: number;
        b: string;
        c: number[];
        d: string[];
        e: (string | number)[];
        f: any;
    };
    export function boo(): (args: any) => number;
    export { foo, bar };
}
