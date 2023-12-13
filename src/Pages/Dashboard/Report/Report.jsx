import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Report = () => {

    // const componentPDF = useRef()



    const componentPDF = useRef()



    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "UserData",
        onAfterPrint: () => alert("data saved in")
    })

    return (
        <div>
            {/* <div ref={componentPDF} style={{ width: "100%" }}  ></div> */}
            <button onClick={generatePDF} className="btn p-2 rounded-md text-white bg-blue-gray-600" >Print Data</button>

        </div>
    );
};

export default Report;