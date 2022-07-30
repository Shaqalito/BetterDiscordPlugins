/**
 * @name ShaqsAlpha
 * @author Shaqalito's Labs
 * @description Alpha version of all Shaqs Plugins.
 * @version 0.0.2
 * @invite j2VFQVjWGN
 * @authorId 370576698481180674
 * @authorLink https://github.com/shaqalito
 * @updateUrl https://github.com/Shaqalito/BetterDiscordPlugins/blob/main/ShaqsAlpha.plugin.js?raw=true
 * @source https://github.com/Shaqalito/BetterDiscordPlugins/blob/main/ShaqsAlpha.plugin.js?raw=true
 */

const changelog = [{
    "title": "Hmmm",
    "items": ["Not much going on here..."]
    }]
const defaultConfig = [
    {
        "type": "switch",
        "id": "enableToasts",
        "name": "Enable Toasts",
        "note": "Allows the plugin to let you know it is working, and also warn you about voice settings",
        "value": true
    },
    {
        "type": "switch",
        "id": "enableTestFeatures",
        "name": "Test/Beta Features",
        "note": "Enables the test and beta features. (CAN BE VERY BUGGY AND UNSTABLE)",
        "value": false
    }
    ]
const config = {"main": "index.js", "info": {"name": "ShaqsAlpha", "authors": [{"name": "Shaqalito's Labs", "discord_id": "370576698481180674", "github_username": "Shaqalito"}], "description": "Alpha version of all Shaqs Plugins.", "version": "0.0.2", "github_raw": "https://github.com/Shaqalito/BetterDiscordPlugins/blob/main/ShaqsAlpha.plugin.js?raw=true", "github": "https://github.com/shaqalito"}, rawUrl: "https://github.com/Shaqalito/BetterDiscordPlugins/blob/main/ShaqsAlpha.plugin.js?raw=true", "changelog": changelog, "defaultConfig": defaultConfig}


module.exports = (() => {
    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is mi Please clicssing.k Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });

        
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
  const { WebpackModules, Patcher, Toasts, PluginUpdater } = Library;

  return class ShaqsAlpha extends Plugin {
    onStart() {
        PluginUpdater.checkForUpdate("ShaqsAlpha", config.info.version, config.rawUrl)
        const voiceModule = WebpackModules.getByPrototypes("setSelfDeaf");
        Patcher.after(voiceModule.prototype, "initialize", this.replacement.bind(this));
    }
    replacement(thisObj, _args, ret) {
        if(this.settings.enableToasts) {
            Toasts.info("Joined a channel !", {timeout: 3000})
        }
    }
    onStop() {
      Patcher.unpatchAll();
    }
    getSettingsPanel() {
      const panel = this.buildSettingsPanel();
      return panel.getElement();
    }
  };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();

/*@end@*/