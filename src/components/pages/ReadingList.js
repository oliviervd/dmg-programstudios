import React, { Suspense } from "react";
import useGoogleSheets from "use-google-sheets";
import {Link} from "react-router-dom";

const XenoHeader = React.lazy(()=>(import("../elements/xenoHeader")))

const ReadingList = () => {

    const {data} = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsNames: ['reading_list'],
    })

    let  _list = [];
    data.map((x)=>{
        x.data.map((l)=>{
            _list.push(l);
        })
    })

    for (let i=0; i<_list.length; i++) {
        console.log(i);
    }

    return (
        <div>
            <Suspense>
                <XenoHeader header_main={true} header_nav={true}/>
            </Suspense>
            <h1 className="text-center">READING LIST</h1>

            <div className="grid--3_4_3">
                <div/>
                <p className="text-center text">
                </p>
                <div/>
            </div>

            <div className="grid--2_6_2">
                <div></div>
                <div>
                    <div className="grid--7_1_2">
                        <div></div>
                        <div>//</div>
                        <div>referenced in contributions:</div>
                    </div>
                    {_list.map((lit) => {
                            if (lit.part_of == "x") {
                                return (
                                    <div>
                                        <div className="grid--7_1_2">
                                            <div>
                                                <p className="left text background__white">{lit.author}, <i><u>{lit.title}</u></i> ({lit.year}), {lit.publisher}
                                                </p>
                                            </div>
                                            <div></div>
                                            <div>
                                                <Link to={'/' + lit.relevant_contrib}>
                                                    <p className='left text background__cool-to-warm-spectrum nav--header'>
                                                        {lit.relevant_contrib}
                                                    </p>
                                                </Link>
                                            </div>

                                        </div>
                                        <div className="dotLine"></div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <div className="grid--7_1_2">
                                            <div>
                                                <p className="left text background__white">{lit.author}, <i><u>{lit.title}</u></i>, in {lit.part_of} ({lit.year}), {lit.publisher}
                                                </p>
                                            </div>
                                            <div></div>
                                            <div>
                                                <Link to={'/' + lit.relevant_contrib}>
                                                    <p className='left text background__cool-to-warm-spectrum nav--header'>
                                                        {lit.relevant_contrib}
                                                    </p>
                                                </Link>
                                            </div>

                                        </div>
                                        <div className="dotLine"></div>
                                    </div>
                                )
                            }
                        }
                    )
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}; export default ReadingList;

