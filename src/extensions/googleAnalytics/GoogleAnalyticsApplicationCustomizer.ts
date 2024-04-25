import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GoogleAnalyticsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GoogleAnalyticsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGoogleAnalyticsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  trackingID: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GoogleAnalyticsApplicationCustomizer
  extends BaseApplicationCustomizer<IGoogleAnalyticsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    //let message: string = this.properties.testMessage;
    let trackingID: string = this.properties.trackingID;
    //let trackingID: string = "UA-233660487-1";
    console.log("this is ampeer");
    console.log(trackingID);
    if (!trackingID) {
      console.log("Tracking ID not provided");
      Log.info(LOG_SOURCE, "Tracking ID not provided");
      
    //if (!message) {
    //  message = '(No properties were provided.)';
    }
    else{ 
      // var gtagScript = document.createElement("script");
      // gtagScript.type = "text/javascript";
      // gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;
      // gtagScript.async = true;
      // document.head.appendChild(gtagScript);
      // eval(`
      // window.dataLayer = window.dataLayer || [];
      // function gtag(){dataLayer.push(arguments);}
      // gtag('js', new Date());
      // gtag('config',  '${trackingID}');
      // `);

      console.log("Tracking ID provided = ", trackingID);
      var gtagScript = document.createElement("script");
      gtagScript.type = "text/javascript";
      gtagScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${trackingID}');`;   
      document.head.appendChild(gtagScript); 
    }
    return Promise.resolve();
    //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    //return Promise.resolve();
    //this is now proper documented Thanks.
  }
}
