import {
    useManifest,
    useVisibleCanvases,
    useSimpleViewer,
    CanvasPanel,
    CanvasContext,
    useViewerPreset
} from "react-iiif-vault";

export function IIIFViewer() {

    const manifest = useManifest();
    const canvases = useVisibleCanvases()
    let _multiple = false
    let _last = false
    let _limit = manifest.items.length;

    if (manifest.items.length > 1) { _multiple=true}

    const { nextCanvas, previousCanvas } = useSimpleViewer();

    function next() {

    }

    if (!manifest) {
        return <div>Loading..</div>;
    }

    let accumulator = 0;

    return (
        <>
            <CanvasPanel.Viewer height={600} background="white">
                {canvases.map((canvas, idx) => {
                    const margin = accumulator;
                    accumulator += canvas.width;
                    return (
                        <CanvasContext canvas={canvas.id} key={canvas.id}>
                            <CanvasPanel.RenderCanvas
                                key={canvas.id}
                                strategies={["3d-model", "media", "images"]}
                                renderViewerControls={
                                    idx === 0 ? () => <ViewerControls /> : undefined
                                }

                                // renderMediaControls={
                                //   idx === 0 ? () => <MediaControls /> : undefined
                                // }
                                x={margin}
                            />
                        </CanvasContext>
                    );
                })}
            </CanvasPanel.Viewer>
            {_multiple&&
                <div className={"grid--1_1"} style={{position: "relative"}}>
                    <h1 className={"italic"} style={{color: "black", margin: "10px", background: "white"}} onClick={previousCanvas}> ↜ </h1>
                    <h1 className={"italic"} style={{color: "black", margin: "10px", background: "white"}} onClick={nextCanvas}> ↝ </h1>
                </div>
            }

        </>
    );
}

function ViewerControls() {
    const preset = useViewerPreset();

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 12,
                background: "white"
            }}
        >
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.zoomOut()}> zoom out </p>
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.zoomIn()}> zoom in </p>
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.goHome()}>full</p>
        </div>
    );
}
