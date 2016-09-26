import { basename } from "path";

import { MetaTag } from "../interfaces/MetaTag";
import { Material } from "./Material";
import { asyncMap } from "../utils";

// TODO: add page template which wraps all blocks.
export interface PageConstructorArg {
  name: string;
  deployPath: string;
  template?: string;
  blocks?: string[];
  materials?: { scripts?: Material[], styles: Material[], assets: Material[] };
  meta?: MetaTag[];
  resources?: { head?: string[], body: string[] };
  context?: any;
}

const TEMPLATE = `
<div id="ledeRoot">
  {% asyncAll $block in $BLOCKS %}
    {% BLOCK $block %}
  {% endall %}
</div>
`;

export class Page {
  deployPath: string;
  blocks: string[];
  materials: { scripts: Material[], styles: Material[], assets: Material[] };
  meta: MetaTag[];
  resources: { head: string[], body: string[] };
  name: string;
  template: string;
  context: any;

  constructor({ deployPath, blocks, materials, meta, resources, name, template, context }: PageConstructorArg) {
    this.name = name;
    this.context = context || {};
    this.deployPath = deployPath;
    this.blocks = blocks || [];
    this.meta = meta || [];
    this.materials = { styles: [], scripts: [], assets: [] };
    this.resources = { head: [], body: [] };
    this.template = template || TEMPLATE;

    this.materials.styles = materials && materials.styles ? materials.styles.map(constructMaterial("style")) : [];
    this.materials.scripts = materials && materials.scripts ? materials.scripts.map(constructMaterial("script")) : [];
    this.materials.assets = materials && materials.assets ? materials.assets.map(constructMaterial("asset")) : [];

    if (resources) {
      this.resources.head = resources.head || [];
      this.resources.body = resources.body || [];
    }

    function constructMaterial(type) {
      return function(input) {
        const overridableName = input.as || basename(input.id);
        return { type, id: input.id, overridableName };
      };
    }
  };

  // async init(): Promise<Page> {
  //   this.materials.styles = await asyncMap(this.materials.styles, async (m) => await m.fetch());
  //   this.materials.scripts = await asyncMap(this.materials.scripts, async (m) => await m.fetch());
  //   this.materials.assets = await asyncMap(this.materials.assets, async (m) => await m.fetch());
  //   return this;
  // }
}

// /**
//  * A Page specifies configuration for one baked html file.
//  *
//  * {prop} deployPath – Path on which to deploy Page. Appended to Project.deployRoot.
//  * {prop} blocks – Ordered list of Blocks to include on Page.
//  * {prop} materials – Specifies {script, style, asset} Materials to include on Page. Materials on a Page belong to one
//  * of three categories (scripts, styles, or assets) and are arranged in an ordered list. Materials that appear later in
//  * the category list will override Materials earlier in the list if they have the same overidableName.
//  * {prop} meta – a list of MetaTags to be applied to the Page.
//  * {prop} resources – Specifies strings to be inserted in the {head, body} of the Page. Useful for linking scripts or
//  * styles from a cdn.
//  */