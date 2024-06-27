declare module 'written-number' {
    interface Options {
        lang?: 'es' | 'en' | 'fr' | 'pt' | string;
        noAnd?: boolean;
        separator?: string;
        conjunction?: string;
    }

    function writtenNumber(value: number, options?: Options): string;

    namespace writtenNumber {
        let defaults: { lang: string };
    }

    export = writtenNumber;
}
