class SettingsConfig {
  constructor() {
    this.deployPath = "pageOne/should/deploy/here";
    this.blocks = [];
    this.materials = {
      scripts: [],
      styles: [],
      assets: []
    };
    this.resources = {};
    this.meta = [];
  }
}

// DO NOT CHANGE ANYTHING BELOW THIS LINE
// These two lines are necessary for lede to pull in this module at runtime.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsConfig;