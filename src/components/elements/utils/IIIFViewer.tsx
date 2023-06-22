import {
    useManifest,
    useVisibleCanvases,
    useSimpleViewer,
    CanvasPanel,
    // ViewerControls,
    // MediaControls,
    CanvasContext,
    useViewerPreset
} from "react-iiif-vault";

export function IIIFViewer() {
    const manifest = useManifest();

    console.log(manifest);

    const canvases = useVisibleCanvases();
    const { nextCanvas, previousCanvas } = useSimpleViewer();

    if (!manifest) {
        return <div>Loading..</div>;
    }

    let accumulator = 0;

    return (
        <>
            <CanvasPanel.Viewer height={600}>
                {canvases.map((canvas, idx) => {
                    const margin = accumulator;
                    accumulator += canvas.width;
                    return (
                        <CanvasContext canvas={canvas.id} key={canvas.id} >
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
            <div style={{ display: "flex" }}>
                <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={previousCanvas}>prev</p>
                <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={nextCanvas}>next</p>
            </div>
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
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.zoomOut()}>Zoom Out</p>
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.zoomIn()}>Zoom in</p>
            <p className={"italic"} style={{color: "black", margin: "10px"}} onClick={() => preset?.runtime.world.goHome()}>Home</p>
        </div>
    );
}
