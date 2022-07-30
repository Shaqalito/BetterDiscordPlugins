/**
 * @name ShaqsAlpha
 * @author Shaqalito's Labs
 * @description Alpha version of all Shaqs Plugins.
 * @version a0.0.1
 * @invite j2VFQVjWGN
 * @authorId 370576698481180674
 * @authorLink https://github.com/shaqalito
 * @updateUrl 
 */

module.exports = class ShaqsAlpha {
    load() {} // Optional function. Called when the plugin is loaded in to memory

    start() {} // Required function. Called when the plugin is activated (including after reloads)
    stop() {} // Required function. Called when the plugin is deactivated

    observer(changes) {} // Optional function. Observer for the `document`. Better documentation than I can provide is found here: <https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>
}