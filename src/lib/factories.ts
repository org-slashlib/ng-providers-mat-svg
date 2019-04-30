/**
 *  © 2019, slashlib.org.
 */
 import { SVGProvider }                      from "./interfaces";

 export function svgProviderFactory( provider: SVGProvider ) {
   return () => provider.init();
 }
