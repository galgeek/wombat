import 'mocha/mocha';
import 'chai/chai';
import 'chai-dom';
import 'chai-string';
import {chaiAsPromised, chaiInterface, chaiURL} from './browserfied';
import WombatTestUtil from './wombatTestUtil';

/**
 * @type {chai}
 */
window.chai = chai;
chai.use(chaiAsPromised);
chai.use(chaiInterface);
chai.use(chaiURL);

/**
 * @type {function() : chai.Assertion}
 */
window.expect = chai.expect;
window.setupAfter = {
  EventTarget: ['addEventListener', 'removeEventListener'],
  MessageEvent: ['target', 'srcElement', 'currentTarget', 'eventPhase', 'path'],
  Document: {
    fn: ['write', 'writeln', 'open', 'createElementNS'],
    props: ['URL', 'documentURI']
  },
  override_html_assign: {
    HTMLElement: ['innerHTML', 'outerHTML'],
    HTMLIFrameElement: ['srcdoc'],
    HTMLStyleElement: ['textContent']
  },
  Attr: ['nodeValue', 'value'],
  window: ['setTimeout', 'setInterval', 'getComputedStyle'],
  protoFns: {
    Element: ['getAttribute', 'setAttribute'],
    SVGImageElement: ['getAttribute', 'getAttributeNS', 'setAttribute', 'setAttributeNS']
  },

  elemAttrs: {
    HTMLLinkElement: ['href'],
    CSSStyleSheet: ['href'],
    HTMLImageElement: ['src', 'srcset'],
    HTMLIFrameElement: ['src'],
    HTMLScriptElement: ['src'],
    HTMLVideoElement: ['src', 'poster'],
    HTMLAudioElement: ['src', 'poster'],
    HTMLSourceElement: ['src', 'srcset'],
    HTMLInputElement: ['src'],
    HTMLEmbedElement: ['src'],
    HTMLObjectElement: ['data'],
    HTMLBaseElement: ['href'],
    HTMLMetaElement: ['content'],
    HTMLFormElement: ['action']
  },

  anchorElement: ['href', 'hash', 'pathname', 'host', 'hostname', 'protocol',
    'origin', 'search', 'port'],

  styleProto: {
    on: window.CSS2Properties != null ? 'CSS2Properties' : 'CSSStyleDeclaration',
    props: ['cssText', 'background', 'backgroundImage', 'cursor', 'border', 'borderImage', 'borderImageSource']
  }
};
window.wombatTestUtil = new WombatTestUtil();

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'wombat-sandbox-ready') {
    window.wombatTestUtil.sandboxReady();
  } else {
    console.log(event);
  }
}, false);

window.testLogger = console.log.bind(console);