/**
 * @name ShaqsAlpha
 * @author Shaqalito's Labs
 * @description Alpha version of all Shaqs Plugins.
 * @version 0.0.6
 * @invite j2VFQVjWGN
 * @authorId 370576698481180674
 * @authorLink https://github.com/shaqalito
 * @updateUrl https://raw.githubusercontent.com/Shaqalito/BetterDiscordPlugins/main/ShaqsAlpha.plugin.js
 * @source https://raw.githubusercontent.com/Shaqalito/BetterDiscordPlugins/main/ShaqsAlpha.plugin.js
 */

const changelog = [
    {
        "title": "Added",
        "type": "added",
        "items": ["VC Channel Handling"]
    },
    {
        "title": "TODO",
        "type": "progress",
        "items": [
            "Give a use to the alpha parameter lmao"
        ]
    }
]
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

const config = {"info": {"name": "ShaqsAlpha", "authors": [{"name": "Shaqalito's Labs", "discord_id": "370576698481180674", "github_username": "Shaqalito"}], "description": "Alpha version of all Shaqs Plugins.", "version": "0.0.6", "github_raw": "https://raw.githubusercontent.com/Shaqalito/BetterDiscordPlugins/main/ShaqsAlpha.plugin.js", "github": "https://github.com/shaqalito"}, rawUrl: "https://raw.githubusercontent.com/Shaqalito/BetterDiscordPlugins/main/ShaqsAlpha.plugin.js", "changelog": changelog, "defaultConfig": defaultConfig}

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
  const { WebpackModules, Patcher, Toasts, PluginUpdater, DiscordModules } = Library;

  return class ShaqsAlpha extends Plugin {
    onStart() {
        PluginUpdater.processUpdateCheck(config.info.name, config.rawUrl)
        const voiceModule = WebpackModules.getByPrototypes("setSelfDeaf");
        Patcher.after(voiceModule.prototype, "initialize", this.replacement.bind(this));
    }
    replacement(thisObj, [props], ret) {
        const VoiceChannelIdGetter = WebpackModules.getByProps("getVoiceChannelId")
        if(this.settings.enableToasts) {
            var channel = DiscordModules.ChannelStore.getChannel(VoiceChannelIdGetter.getVoiceChannelId())
            Toasts.info(`Current channel: ${channel.name}`)
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