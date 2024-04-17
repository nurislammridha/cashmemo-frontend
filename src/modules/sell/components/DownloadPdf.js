import React, { createRef, useRef, useState } from 'react'
import './pdf.css'
import canonIcon from './img/canon.png'
import coolzerIcon from './img/coolzer.png'
import dellIcon from './img/dell.png'
import dlinkIcon from './img/dlink.png'
import hpIcon from './img/hp.png'
import inkIcon from './img/ink.jpg'
import longseIcon from './img/longse.jpg'
import spIcon from './img/sp.jpg'
import { jsPDF } from "jspdf";
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import { convertNumberToWords } from '../_redux/SellAction'
import { useReactToPrint } from 'react-to-print';
const DownloadPdf = () => {
    const history = useHistory()
    const location = useLocation()
    const { clientInfo, currentDue, grandTotal, pay, previousDue, sellingDate, sellingProducts, total, discount } = location?.state?.data || {}
    const { name, address, phone } = clientInfo || {}
    let pdfTittle = name + "-" + moment(sellingDate).format('ll')
    const ref = createRef();
    const [loader, setLoader] = useState(false)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: pdfTittle,
    });
    const handleDownLoad = () => {
        setLoader(true);
        var doc = new jsPDF("p", "px", [1000, 1000], "a2", false, false, 2, 1.0);
        doc.html(document.querySelector("#con"), {
            callback: function (pdf) {
                pdf.deletePage(2)
                pdf.deletePage(3)
                pdf.deletePage(4)
                pdf.deletePage(5)
                pdf.deletePage(6)
                pdf.deletePage(2)
                pdf.deletePage(3)
                pdf.deletePage(2)
                pdf.deletePage(2)
                pdf.deletePage(2)
                pdf.save(pdfTittle + ".pdf");
                setLoader(false);
                history.push('/sell')
            },
        });
    }
    // console.log('history?.state?.data', location?.state?.data)
    return (
        <>
            <div className='download'>
                <h6>Download Cash Memo</h6>
                <div>
                    <a
                        className='btn btn-success text-light mr-3'
                        onClick={() => handlePrint()}
                    >
                        {"PRINT"}
                    </a>
                    <a
                        className='btn btn-success text-light'
                        onClick={() => !loader && handleDownLoad()}
                    >
                        {loader ? "Downloading" : "Download"}
                    </a>
                </div>
            </div>
            <div ref={ref} id="con">
                <div className='container' ref={componentRef}>
                    <div className='invoice'>
                        <span>Invoice/Bill</span>
                    </div>
                    <div className='table2'>
                        <table>
                            <tr>
                                <td colSpan={2}>
                                    <div>
                                        <div className='ti_con'>
                                            <div className='title'>IT COMPUTER SOLUTIONS</div>
                                            <div className='trust'>Trust in Our Quality</div>
                                        </div>
                                        <div className='txt'>77, LOWER JESHORE ROAD, FRIDENDS ARCADE MARKET,</div>
                                        <div className='txt'>4TH FLOOR, KHULNA-9100</div>
                                        <div className='txt'>CELL 01710-121138</div>
                                    </div>
                                </td>
                                <td colSpan={3}>
                                    <div>Invoice No: 20240001</div>
                                    <div>Sold By: SANJIT</div>
                                    <div>Ref No: </div>
                                    <div>Date: 21/09/2021</div>
                                </td>
                                <td colSpan={2}>
                                    <div>Print Date</div>
                                    <div>20/04/2023</div>
                                    <div>Print Time</div>
                                    <div>4:50 PM</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div>
                                        <div className='to'>To</div>
                                        <div className='shop_name'>QUICK COMPUTER KHULNA</div>
                                        <div>3/GA FRIENDS ASK AKS SSK ASS</div>
                                        <div>01753109207/01234567890</div>
                                        <div>0234-2343</div>
                                    </div>
                                </td>
                                <td colSpan={5}>
                                    Attention
                                </td>
                            </tr>
                            <tr>
                                <th>SL</th>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Warranty</th>
                                <th>Unit Price</th>
                                <th>UAmount</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Power supply 550w 12cm fan black</td>
                                <td>2</td>
                                <td>PCS</td>
                                <td>12 month</td>
                                <td>234</td>
                                <td>234</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Power supply 550w 12cm fan black</td>
                                <td>2</td>
                                <td>PCS</td>
                                <td>12 month</td>
                                <td>234</td>
                                <td>234</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan={6}>
                                    <div className='footer'>
                                        <div className='left'>
                                            <div>TWO THOUSAND FIFTY FIVE ONLY</div>
                                            <div className='fsb crnt'>
                                                <div>Current Due Amount</div>
                                                <div>9,15,500</div>
                                            </div>
                                        </div>
                                        <div className='right'>
                                            <div className='fsb taka'><div>Total Amount (BDT)</div><div>2,080</div></div>
                                            <div className='fsb taka'><div>Add Vat (BDT)</div><div>2,080</div></div>
                                            <div className='fsb taka'><div>Less Discount (BDT)</div><div>2,080</div></div>
                                            <div className='fsb taka bb'><div>Add Installation/Service Charges (BDT)</div><div>2,080</div></div>
                                            <div className='fsb taka2 pay'><div>Net Payable Amount</div><div>2,080</div></div>
                                            <div className='fsb taka2'><div>Previous Due Amount</div><div>2,080</div></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DownloadPdf