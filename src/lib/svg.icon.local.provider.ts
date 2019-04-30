/**
 *  © 2019, slashlib.org.
 */
import { Injectable }                       from "@angular/core";
import { MatIconRegistry }                  from "@angular/material/icon";
import { DomSanitizer }                     from "@angular/platform-browser";

import { SVGProvider }                      from "./interfaces";

import { ICONS as ACTION }                  from "./svg.icon.google.action";
import { ICONS as ALERT }                   from "./svg.icon.google.alert";
import { ICONS as AV }                      from "./svg.icon.google.av";
import { ICONS as COMMUNICATION }           from "./svg.icon.google.communication";
import { ICONS as CONTENT }                 from "./svg.icon.google.content";
import { ICONS as DEVICE }                  from "./svg.icon.google.device";
import { ICONS as EDITOR }                  from "./svg.icon.google.editor";
import { ICONS as FILE }                    from "./svg.icon.google.file";
import { ICONS as HARDWARE }                from "./svg.icon.google.hardware";
import { ICONS as IMAGE }                   from "./svg.icon.google.image";
import { ICONS as MAPS }                    from "./svg.icon.google.maps";
import { ICONS as NAVIGATION }              from "./svg.icon.google.navigation";
import { ICONS as NOTIFICATION }            from "./svg.icon.google.notification";
import { ICONS as PLACES }                  from "./svg.icon.google.places";
import { ICONS as SOCIAL }                  from "./svg.icon.google.social";
import { ICONS as TOGGLE }                  from "./svg.icon.google.toggle";

const ICONS: Array<Array<string>> = [
  ACTION, ALERT, AV, COMMUNICATION, CONTENT, DEVICE, EDITOR, FILE,
  HARDWARE, IMAGE, MAPS, NAVIGATION, NOTIFICATION, PLACES, SOCIAL, TOGGLE
];

@Injectable()
export class LocalSVGProvider implements SVGProvider {
  public static readonly IDREGEXP = RegExp( 'id=\"([^"]*)\"' );
  /**
   *  Constructor
   */
  constructor( private iconregistry: MatIconRegistry, private sanitizer: DomSanitizer ) { }
  /**
   *  Initializer
   */
  public init(): Promise<any> {
    return new Promise<any>(( resolve, reject ) => {
      try {
        for ( let i in ICONS ) {
              for ( let j in ICONS[ i ] ) {
                    try {
                        let iconname = (ICONS[ i ][ j ].match( LocalSVGProvider.IDREGEXP ))[1].replace( "_24px", "" );
                        // console.log( `registering svg icon ${iconname}`);
                        this.iconregistry.addSvgIconLiteral (
                          iconname, this.sanitizer.bypassSecurityTrustHtml( ICONS[ i ][ j ])
                        );
                     }
                     catch( e ) { console.error( e ); } // this will happen, if there is no attribute "id" (icon name)
              }
        }
        resolve( true );
      }
      catch( err ) { reject( err ); }
    });
  }
}
