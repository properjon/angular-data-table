import GetVendorPrefixedName from './vendorPrefixes';
import { CamelCase } from './utils';

// browser detection and prefixing tools
const ua = window.navigator.userAgent;
const transform = GetVendorPrefixedName('transform');
const backfaceVisibility = GetVendorPrefixedName('backfaceVisibility');
const hasCSSTransforms = !!GetVendorPrefixedName('transform');
const hasCSS3DTransforms = !!GetVendorPrefixedName('perspective');
const isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

export default function TranslateXY(styles, x, y) {
  if (hasCSSTransforms) {
    if (!isSafari && hasCSS3DTransforms) {
      styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
      styles[backfaceVisibility] = 'hidden';
    } else {
      styles[CamelCase(transform)] = `translate(${x}px, ${y}px)`;
    }
  } else {
    styles.top = `${y}px`;
    styles.left = `${x}px`;
  }
}
