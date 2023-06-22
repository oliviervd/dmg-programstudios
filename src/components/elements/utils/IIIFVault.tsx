import {
    SimpleViewerProvider,
    VaultProvider
} from "react-iiif-vault";

import * as React from "react";
import {IIIFViewer} from "./IIIFViewer";

//const _manifest = "https://api.collectie.gent/iiif/presentation/v2/manifest/dmg:1987-1311_0-2"
const _manifest = "https://gist.githubusercontent.com/stephenwf/988fd0008e886ff278a4c00b8037fe85/raw/487907fd430e2b4e08a20135b230980526367dd6/manifest.json"


const IIIFVault = (props) => {
    return(
        <VaultProvider>
            <SimpleViewerProvider manifest={_manifest}>
                <IIIFViewer/>
            </SimpleViewerProvider>
        </VaultProvider>
    )
}

export default IIIFVault