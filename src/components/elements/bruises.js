import React, {useEffect} from "react";
import {createUseGesture, dragAction, pinchAction} from "@use-gesture/react";
import {useSpring, animated} from "@react-spring/web";

const useGesture = createUseGesture([dragAction, pinchAction])

const Bruises = () => {

    useEffect(() => {
        const handler = e => e.preventDefault();
        document.addEventListener('gesturestart', handler)
        document.addEventListener('gesturechange', handler)
        document.addEventListener('gestureend', handler)
        return () => {
            document.addEventListener('gesturestart', handler)
            document.addEventListener('gesturechange', handler)
            document.addEventListener('gestureend', handler)
        }
    }, [])

    const [style, api] = useSpring(()=> ({
        x: 0,
        y: 0,
        scale: 1,
        rotateZ: 0,
    }))
    const ref = React.useRef(null)

    useGesture(
        {
            onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
                if (pinching) return cancel()
                api.start({ x, y })
            },
            onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
                if (first) {
                    const { width, height, x, y } = ref.current.getBoundingClientRect()
                    const tx = ox - (x + width / 2)
                    const ty = oy - (y + height / 2)
                    memo = [style.x.get(), style.y.get(), tx, ty]
                }

                const x = memo[0] - (ms - 1) * memo[2]
                const y = memo[1] - (ms - 1) * memo[3]
                api.start({ scale: s, rotateZ: a, x, y })
                return memo
            },
        },
        {
            target:ref,
            drag: { from: () => [style.x.get(), style.y.get()]},
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    )

    return(
        <div>
            <animated.div className="bruises__box background__white__green" ref={ref} style={style}>
                <div>
                    <div className="bruises__header">BRUISES </div>
                    <div>
                        <img className="notDraggable imgBruises" src="bruise_01.png"/>
                    </div>
                    <div className="bruises__text">
                        <p className="italic" style={{fontFamily:"happy-times-NG_italic_master_web"}}>Peering into the machine, a scene - quite similar to what one would observe through the lense of a microscope - slowly takes form. At first, a blurry scape, a mist of pink feauturing two bodies, gently mutating, resembling the qualities of biological cells, quickly turning visceral. The pinkish mist taking on skin-like qualities, the pulsating organisms turning int bruises.
                        </p>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

export default Bruises;