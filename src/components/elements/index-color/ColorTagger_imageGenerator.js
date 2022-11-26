import React, {useState, Suspense} from "react";
//import ldes_translations from "../../data/postgres_ldes_dmg_translations_ldes_dmg.json"
const ImageViewer = React.lazy(()=> import("./ColorTagger_imageModal"))

// test

/*
function LDESViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.uri === uri
        }
    )

}
*/

const ColorTagger_imageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const object_colors = props.data;
    const objCount = props.num;
    const _images = [];
    const _titles = props.titles;

    const[imageViewer1, setImageViewer1] = useState(false);
    const[imageViewer2, setImageViewer2] = useState(false);
    const[imageViewer3, setImageViewer3] = useState(false);

    for (let imCount=0; imCount<objCount; ++imCount) {
        const x = curatedSet[imCount]
        const uri = object_colors[x]["URI"];
        //const _LDES = LDESViaURI(uri)
        //console.log(_LDES)
        let _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        let _title = object_colors[x]["title"]
        _images.push(_im);
        _titles.push(_title)
    }

    props.setTitles(_titles)


    //todo: make one function (map) to generate three images

    return(
        <div className="grid--even_3" id="imageRandom">
            <Suspense>
                <div>
                    <h4 className={"verticalText"}></h4>
                    <img className="__img center" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer1(true)}}  src={_images[0][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                    {/*<ImageViewer open={imageViewer1} onClose={() => setImageViewer1(false)} image={_images[0]} _title={_titles[0]}/>*/}
                </div>
            </Suspense>
            <Suspense>
                <div>
                    <h4 className={"verticalText"}></h4>
                    <img className="__img center" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer2(true)}}  src={_images[1][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                    {/*<ImageViewer open={imageViewer2} onClose={() => setImageViewer2(false)} image={_images[1]} _title={_titles[1]}/>*/}
                </div>
            </Suspense>
            <Suspense>
               <div>
                   <h4 className={"verticalText"}></h4>
                   <img className="__img center" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer3(true)}} src={_images[2][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                   {/*<ImageViewer open={imageViewer3} onClose={()=> setImageViewer3(false)} image={_images[2]} _title={_titles[2]}/>*/}
               </div>
            </Suspense>
        </div>
    )
}

export default ColorTagger_imageGenerator;