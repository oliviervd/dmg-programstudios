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
                <button onClick={previousCanvas}>prev</button>
                <button onClick={nextCanvas}>next</button>
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
            <button onClick={() => preset?.runtime.world.zoomOut()}>Zoom Out</button>
            <button onClick={() => preset?.runtime.world.zoomIn()}>Zoom in</button>
            <button onClick={() => preset?.runtime.world.goHome()}>Home</button>
        </div>
    );
}
