/**
 *  © 2019, slashlib.org.
 */
import { MatIconRegistry }  from "@angular/material/icon";
import { DomSanitizer }     from "@angular/platform-browser";

const ASSETSPATH:     string = "assets/";
const SVG:            string = "svg"
const SVGASSETSPATH:  string = `${ ASSETSPATH }${ SVG }/`;

const ACTIONICONNAMES: Array<string> = [
  "ic_3d_rotation", "ic_accessibility", "ic_accessible", "ic_account_balance", "ic_account_balance_wallet",
  "ic_account_box", "ic_account_circle", "ic_check_circle", "ic_delete", "ic_info", "ic_info_outline","ic_help",
  "ic_help_outline", "ic_settings"
];
const AVICONNAMES: Array<string> = [
  "ic_not_interested"
];
const CONTENTICONNAMES: Array<string> = [
  "ic_add", "ic_add_box", "ic_add_circle", "ic_add_circle_outlined", "ic_create"
];
const CUSTOMICONNAMES: Array<string> = [];
const EDITORICONNAMES: Array<string> = [
  "ic_mode_edit"
];
const FILEICONNAMES: Array<string> = [
  "ic_file_download", "ic_file_upload"
];
const SOCIALICONNAMES: Array<string> = [
  "ic_public"
];
const PATHLIST: Array<string> = [
  "action", "av", "content", "custom", "editor", "file", "social"
];
const NAMES: any = {
  "action":   ACTIONICONNAMES,
  "av":       AVICONNAMES,
  "content":  CONTENTICONNAMES,
  "custom":   CUSTOMICONNAMES,
  "editor":   EDITORICONNAMES,
  "file":     FILEICONNAMES,
  "social":   SOCIALICONNAMES
};

export class UrlSVGLoader {
  // set to true, after initializer run
  private _initialized: boolean = false;
  // loaders path to svg assets on server - eg.: "assets/svg"
  private assetspath: string;
  /**
   *  Constructor
   *
   */
  constructor( private iconregistry: MatIconRegistry, private sanitizer: DomSanitizer ) { }
  /**
   *  Initializer
   *
   *  Note: do not use local file paths unless your browser is enabled to bypass
   *        restrictions for CORS and local files
   *
   *  @param  svgassetspath {string} -
   *          loaders path to svg icons on the server. Should be something
   *          like "assets/svg", which results in: "https(s)://www.url.org/assets/svg
   */
  public init( svgassetspath?: string, pathlist?: Array<string>, iconnames?: any ): void {
    if ( ! svgassetspath ) { svgassetspath = SVGASSETSPATH; }
    if ( ! pathlist )  { pathlist  = PATHLIST; }
    if ( ! iconnames ) { iconnames = NAMES;    }

    // validate assetspath
    this.assetspath = svgassetspath.endsWith( "/" ) ? svgassetspath: `${svgassetspath}/`;


    if ( this._initialized ) { return; /* run only once! */ }

    for ( let index in pathlist ) {
          try {
            let node  = pathlist[ index ];
            let path  = `${ this.assetspath }${ node }/`;
            let names = iconnames[ node ] || [ ];
            this.register( path, names );
          }
          catch( e ) { console.error( "UrlSVGLoader::init - index: ", index, "\n", e ); }
    }
    this._initialized = true;
  }
  /**
   *  Register svg icons
   */
  private register( path: string, iconnames: Array<string> ): void {
    let iconname: string = null;
    let iconpath: string = null;
    for ( let index in iconnames ) {
          iconname = iconnames[ index ];
          iconpath = `${ path }${ iconname }.${ SVG }`;
          // console.log( `====> SVGIconService::ngOnInit() registering '${iconname}' : '${iconpath}'` );
          this.iconregistry.addSvgIcon(
            iconname, this.sanitizer.bypassSecurityTrustResourceUrl( iconpath )
          );
    }
  }
}
