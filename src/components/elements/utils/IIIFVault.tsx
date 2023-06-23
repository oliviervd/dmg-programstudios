import {
    SimpleViewerProvider,
    VaultProvider
} from "react-iiif-vault";

import * as React from "react";
import {IIIFViewer} from "./IIIFViewer";


//const _manifest = "https://api.collectie.gent/iiif/presentation/v2/manifest/dmg:1987-1311_0-2"
//const _manifest = "https://gist.githubusercontent.com/oliviervd/e4cb47c260195e35920562abc9afb4bb/raw/6cc75551cfa2a931b619a05e015d56aab0f0ee7c/gistfile1.json"
const _manifest = "https://gist.githubusercontent.com/oliviervd/dedf50925615b42082b1b9a21f958de9/raw/01ddb804950632c24eeb4a206f44b7710609e37c/test.json"

const IIIFVault = (props) => {

    const _manifest = String(props.manifest)

    return(
        <VaultProvider>
            <SimpleViewerProvider manifest={_manifest}>
                <IIIFViewer/>
            </SimpleViewerProvider>
        </VaultProvider>
    )
}

export default IIIFVault