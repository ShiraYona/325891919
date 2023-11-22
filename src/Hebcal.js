//עובד פצצה, ב D ואצל המורה לא רץ????????

import { useEffect, useState } from "react"
import { Fieldset } from 'primereact/fieldset';
import { Calendar } from 'primereact/calendar';

const Hebcal = () => {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const fetchData = async () => {
        const ref = "https://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min=on&nx=on&mf=on&ss=on&mod=on&lg=he&s=on&start=" + startDate + "&end=" + endDate + ""
        await fetch(ref)
            .then(res => res.json())
            .then(data => setData(data), console.log(data, 'data'))
            .catch(err => console.log(err, 'err'))

    }
    let parashaData = []
    const ParashaOnly = () => {
        data.length > 0 && data.map((item) => {
            if (item.className === "parashat")
                parashaData.push(item)
        })
        console.log(parashaData, 'parashaData');
        setData(parashaData)
    }

    useEffect(() => {
        fetchData()
    }, [startDate, endDate])

    return (
        <>
            <h1>  Hello to HebCal - Hebrew calender </h1>
            <input placeholder="enter start date" type={Date} onBlur={(e1) => setStartDate(e1.target.value)}></input>
            {/* <Calendar dateFormat="yy/mm/dd" value={startDate} onChange={(e) => setStartDate(e.value.toDateString)}></Calendar> */}
            <br></br>
            <br></br>

            <input placeholder="enter end date" type={Date} onBlur={(e2) => setEndDate(e2.target.value)}></input>
            {/* <Calendar dateFormat="yy/mm/dd" value={endDate} onChange={(e) => setEndDate(e.value.toDateString)}></Calendar> */}
            <br></br>
            <br></br>
            <button onClick={ParashaOnly}>Show Only Parashot</button>
            <button onClick={fetchData}>Show All</button>
            <br></br>
            <br></br>
            {data.length > 0 && data.map((item) => {
                return (
                    <>
                        <Fieldset legend={item.title} style={{ color: "brown" }} toggleable >
                            <h1>{item.description}</h1>
                            <h1>{item.start}</h1>
                        </Fieldset>
                    </>
                )



            })}
        </>
    )



}
export default Hebcal;