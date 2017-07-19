declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const json: any[] | { [key: string]: any; };
  export default json;
}
