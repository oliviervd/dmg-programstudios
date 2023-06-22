import {
    SimpleViewerProvider,
    VaultProvider
} from "react-iiif-vault";

import * as React from "react";
import {IIIFViewer} from "./IIIFViewer";




const IIIFVault = (props) => {
    return(
        <VaultProvider>
            <SimpleViewerProvider manifest={"https://api.collectie.gent/iiif/presentation/v2/manifest/dmg:1987-1311_0-2"}>
                <IIIFViewer/>
            </SimpleViewerProvider>
        </VaultProvider>
    )
}

export default IIIFVault